import { VESSELS, PORTS, getOrigin, getPort } from './data';
import { generateHistory, forecast } from './model';

export const fits = (v, port) => v.draft <= port.maxDraft && v.loa <= port.maxLoa && v.beam <= port.maxBeam;

export function congestionLevel(port) {
  const m = new Date().getMonth();
  return Math.min(100, port.congestion + (m >= 5 && m <= 8 ? 8 : 0)); // monsoon boost
}
export const waitHours = (c) => Math.round(c * 0.6);

export function evaluateVessel(v, port, volume, rate) {
  const dischargeDays = v.capacity / port.handling;
  const st = (ok) => (ok ? 'pass' : 'fail');
  const checks = [
    { key: 'draft', label: 'Draft', value: v.draft, limit: port.maxDraft, unit: 'm', status: st(v.draft <= port.maxDraft) },
    { key: 'loa', label: 'LOA', value: v.loa, limit: port.maxLoa, unit: 'm', status: st(v.loa <= port.maxLoa) },
    { key: 'beam', label: 'Beam', value: v.beam, limit: port.maxBeam, unit: 'm', status: st(v.beam <= port.maxBeam) },
    { key: 'handling', label: 'Unload', value: +dischargeDays.toFixed(1), limit: 3, unit: 'd', status: dischargeDays <= 3 ? 'pass' : 'warn' },
  ];
  const compatible = checks.every((c) => c.status !== 'fail');
  const voyages = Math.ceil(volume / v.capacity);
  const perVoyage = volume / voyages;
  const billed = voyages * Math.max(perVoyage, 0.85 * v.capacity); // dead-freight if under-filled
  const rateV = rate * v.mult;
  const freight = billed * rateV;
  const idleDays = waitHours(congestionLevel(port)) / 24 + dischargeDays;
  const portCost = voyages * idleDays * v.hire;
  const total = freight + portCost;
  return { vessel: v, checks, compatible, voyages, utilization: perVoyage / v.capacity, billed, rateV, freight, portCost, total, effective: total / volume };
}

function bookingWindow(fc, current) {
  const first = fc.points.slice(0, 30);
  let idx = 0;
  first.forEach((p, i) => { if (p.mean < first[idx].mean) idx = i; });
  const day = first[idx].h;
  return { start: Math.max(1, day - 3), end: Math.min(30, day + 3), day, minRate: first[idx].mean, gain: current - first[idx].mean };
}

function contractStrategy(fc, best, months, current, win) {
  const m = best.vessel.mult;
  const lock = Math.min(current, win.minRate) * m * 0.96; // term-contract volume discount
  const parcels = Array.from({ length: months }, (_, i) => {
    const day = i * 30;
    const spotRate = day === 0 ? current : fc.points[Math.min(day, fc.points.length) - 1].mean;
    return { name: `M${i + 1}`, spot: spotRate * m * best.billed, contract: lock * best.billed };
  });
  const spotCost = parcels.reduce((s, p) => s + p.spot, 0);
  const contractCost = parcels.reduce((s, p) => s + p.contract, 0);
  const savings = spotCost - contractCost;
  return {
    parcels, spotCost, contractCost, savings, lockRate: lock,
    voyages: months * best.voyages,
    recommend: savings > 0 ? 'Multiple-voyage contract' : 'Stay on spot',
  };
}

function congestionInfo(port, best) {
  const level = congestionLevel(port);
  const hours = waitHours(level);
  const alternatives = best
    ? PORTS.filter((q) => q.id !== port.id && fits(best.vessel, q) && congestionLevel(q) < level)
        .sort((a, b) => a.congestion - b.congestion).slice(0, 3)
        .map((q) => ({ port: q, hours: waitHours(congestionLevel(q)) }))
    : [];
  const idleCost = best ? (hours / 24) * best.vessel.hire * best.voyages : 0;
  return { level, hours, idleCost, alternatives, status: level >= 60 ? 'High' : level >= 35 ? 'Medium' : 'Low' };
}

const std = (a) => { const m = a.reduce((s, x) => s + x, 0) / a.length; return Math.sqrt(a.reduce((s, x) => s + (x - m) ** 2, 0) / a.length); };

function riskInfo(history, cong, change30) {
  const rets = history.slice(1).map((h, i) => Math.log(h.rate / history[i].rate));
  const volRatio = std(rets.slice(-14)) / std(rets);
  const vol = volRatio > 1.25 ? 'High' : volRatio > 0.85 ? 'Medium' : 'Low';
  const dir = change30 > 0.03 ? 'High' : change30 > -0.02 ? 'Medium' : 'Low';
  const score = { Low: 1, Medium: 2, High: 3 };
  const s = (score[vol] + score[dir] + score[cong.status]) / 3;
  return {
    overall: s >= 2.4 ? 'High' : s >= 1.6 ? 'Medium' : 'Low',
    items: [
      { name: 'Freight volatility', level: vol, why: `Price swings over the last 14 days are ${volRatio.toFixed(2)}× the 3-year normal.` },
      { name: 'Rate direction', level: dir, why: change30 > 0 ? `Rates expected to rise ${(change30 * 100).toFixed(1)}% in 30 days — booking later costs more.` : `Rates expected to ease ${Math.abs(change30 * 100).toFixed(1)}% in 30 days — waiting can pay off.` },
      { name: 'Port congestion', level: cong.status, why: `Congestion index ${cong.level}/100 means roughly ${cong.hours} hours of waiting before berthing.` },
    ],
  };
}

// Historical replay: at each past month, would our "lock a contract in the best
// 30-day window" advice have beaten booking each month on spot? Uses only data
// available up to that point, then compares against realized rates.
export function decisionBacktest(history, best, months) {
  if (!best) return null;
  const m = best.vessel.mult;
  const step = 30;
  const minAhead = months * step;
  const startIdx = Math.max(420, history.length - 760);
  const windows = [];
  let totalSaving = 0, wins = 0, count = 0;
  for (let i = startIdx; i + minAhead < history.length - 1; i += step) {
    const train = history.slice(0, i);
    const fc = forecast(train, minAhead + 10);
    const current = train[train.length - 1].rate;
    const win = bookingWindow(fc, current);
    const lock = Math.min(current, win.minRate) * m * 0.96;
    let spotCost = 0, contractCost = 0;
    for (let mo = 0; mo < months; mo++) {
      const realized = history[i + mo * step].rate * m;
      spotCost += realized * best.billed;
      contractCost += lock * best.billed;
    }
    const saving = spotCost - contractCost;
    totalSaving += saving; count++; if (saving > 0) wins++;
    windows.push({ i, saving: Math.round(saving), lock: +lock.toFixed(2) });
  }
  return { windows, totalSaving, wins, count, accuracy: count ? wins / count : 0 };
}

export function analyze(p) {
  const origin = getOrigin(p.origin);
  const port = getPort(p.dest);
  const history = generateHistory(origin, port);
  const fc = forecast(history, 90);
  const current = history[history.length - 1].rate;
  const vessels = VESSELS.map((v) => evaluateVessel(v, port, p.volume, current));
  const eligible = vessels.filter((v) => v.compatible);
  const best = eligible.length ? eligible.reduce((a, b) => (b.total < a.total ? b : a)) : null;
  const win = bookingWindow(fc, current);
  const strategy = best ? contractStrategy(fc, best, p.months, current, win) : null;
  const congestion = congestionInfo(port, best);
  const change30 = (fc.points[29].mean - current) / current;
  const risk = riskInfo(history, congestion, change30);
  const decisionBt = best ? decisionBacktest(history, best, p.months) : null;
  return { origin, port, history, fc, current, vessels, best, window: win, strategy, congestion, risk, change30, decisionBt, params: p };
}
