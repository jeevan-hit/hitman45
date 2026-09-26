import { addDays, startOfDay } from 'date-fns';
import { ORIGINS, PORTS } from './data';

// ---------- Simulated market data (seeded, reproducible) ----------
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function hashStr(s) {
  let h = 2166136261;
  for (const c of s) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
const gauss = (r) => Math.sqrt(-2 * Math.log(r() || 1e-9)) * Math.cos(2 * Math.PI * r());
const dayOfYear = (d) => Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);

export function generateHistory(origin, port, days = 1095) {
  const r = mulberry32(hashStr(origin.id + '|' + port.id));
  const today = startOfDay(new Date());
  const base = origin.base * port.premium;
  const phase = r() * Math.PI * 2;
  let oil = 78 + gauss(r) * 4;
  let e = 0;
  const out = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = addDays(today, -i);
    const t = days - 1 - i;
    const doy = dayOfYear(date);
    oil += 0.45 * gauss(r) + 0.01 * (78 - oil);
    e = 0.9 * e + 0.009 * gauss(r);
    const season = 0.07 * Math.sin((2 * Math.PI * (doy - 80)) / 365) + 0.025 * Math.sin((4 * Math.PI * doy) / 365);
    const cycle = 0.05 * Math.sin((2 * Math.PI * t) / 520 + phase);
    const rate = base * (1 + season + cycle + e) * (1 + 0.004 * (oil - 78));
    out.push({ date, rate: +rate.toFixed(2), oil: +oil.toFixed(1) });
  }
  return out;
}

// ---------- Forecasting model: seasonal index + damped Holt trend + oil regression ----------
const ALPHA = 0.5, BETA = 0.02, PHI = 0.97;
const avg = (a) => a.reduce((s, x) => s + x, 0) / a.length;

// Ratio-to-moving-average seasonal index per month (removes slow market cycles).
export function seasonalIndices(history) {
  const W = 30;
  const sums = Array(12).fill(0), counts = Array(12).fill(0);
  for (let i = W; i < history.length - W; i++) {
    const ma = avg(history.slice(i - W, i + W + 1).map((h) => h.rate));
    const m = history[i].date.getMonth();
    sums[m] += history[i].rate / ma; counts[m]++;
  }
  const raw = sums.map((s, m) => (counts[m] ? s / counts[m] : 1));
  const norm = avg(raw);
  return raw.map((r) => r / norm);
}

// Smooth daily factor: interpolate between mid-month indices (no month-edge jumps).
function dailyFactor(S, date) {
  const m = date.getMonth();
  const frac = (date.getDate() - 15) / 30;
  const other = frac >= 0 ? (m + 1) % 12 : (m + 11) % 12;
  const w = Math.abs(frac);
  return S[m] * (1 - w) + S[other] * w;
}

function fitHolt(y) {
  let l = y[0], b = 0, sq = 0;
  for (let t = 1; t < y.length; t++) {
    const pred = l + PHI * b;
    sq += (y[t] - pred) ** 2;
    const nl = ALPHA * y[t] + (1 - ALPHA) * pred;
    b = BETA * (nl - l) + (1 - BETA) * PHI * b;
    l = nl;
  }
  return { l, b, sigma: Math.sqrt(sq / (y.length - 1)) };
}

// OLS slope/intercept of y on x (used to learn the oil → freight relationship).
function ols(xs, ys) {
  const n = xs.length;
  const mx = avg(xs), my = avg(ys);
  let cov = 0, vx = 0;
  for (let i = 0; i < n; i++) { const dx = xs[i] - mx; cov += dx * (ys[i] - my); vx += dx * dx; }
  const b = vx > 0 ? cov / vx : 0;
  return { a: my - b * mx, b, mx };
}

export function forecast(history, horizon = 90) {
  const S = seasonalIndices(history);
  const deseas = history.map((h) => h.rate / dailyFactor(S, h.date));
  const oils = history.map((h) => h.oil);
  // Learn how much each $/bbl of oil moves the (deseasonalized) freight rate.
  const reg = ols(oils, deseas);
  const resid = deseas.map((d, i) => d - (reg.a + reg.b * oils[i]));
  const { l, b, sigma } = fitHolt(resid);
  const last = history[history.length - 1].date;
  const lastOil = oils[oils.length - 1];
  const oilMean = avg(oils.slice(-252)); // ~last year mean
  const points = [];
  let damp = 0;
  for (let h = 1; h <= horizon; h++) {
    damp += PHI ** h;
    const date = addDays(last, h);
    const s = dailyFactor(S, date);
    const oilF = oilMean + (lastOil - oilMean) * Math.pow(0.9, h); // mean-reverting oil expectation
    const mean = (reg.a + reg.b * oilF + (l + damp * b)) * s;
    const spread = 1.28 * sigma * Math.sqrt(1 + (h - 1) * ALPHA * ALPHA) * s; // ~80% band
    points.push({ date, h, mean, lo: mean - spread, hi: mean + spread, oil: +oilF.toFixed(1) });
  }
  return { points, S, sigma, oil: { coef: reg.b, lastOil, oilMean } };
}

// ---------- Evaluation: chronological hold-out vs naive baseline ----------
function metrics(rows, key) {
  const errs = rows.map((r) => r[key] - r.actual);
  return {
    mae: avg(errs.map(Math.abs)),
    rmse: Math.sqrt(avg(errs.map((e) => e * e))),
    mape: avg(rows.map((r, i) => Math.abs(errs[i]) / r.actual)) * 100,
  };
}

export function backtest(history, holdout = 60) {
  const train = history.slice(0, -holdout);
  const test = history.slice(-holdout);
  const fc = forecast(train, holdout);
  const naive = train[train.length - 1].rate;
  const rows = test.map((t, i) => ({
    date: t.date, actual: t.rate, model: fc.points[i].mean, naive, lo: fc.points[i].lo, hi: fc.points[i].hi,
  }));
  return { rows, model: metrics(rows, 'model'), naive: metrics(rows, 'naive'), trainSize: train.length };
}

let matrixCache = null;
export function routeMatrix() {
  if (matrixCache) return matrixCache;
  matrixCache = ORIGINS.map((o) => ({
    origin: o,
    cells: PORTS.map((p) => {
      const h = generateHistory(o, p);
      const cur = h[h.length - 1].rate;
      const f = forecast(h, 30).points[29].mean;
      return { port: p, current: cur, change: (f - cur) / cur };
    }),
  }));
  return matrixCache;
}
