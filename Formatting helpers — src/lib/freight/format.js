export const usd = (n, d = 0) =>
  '$' + n.toLocaleString('en-US', { maximumFractionDigits: d, minimumFractionDigits: d });

export const usdShort = (n) => {
  const a = Math.abs(n);
  const s = n < 0 ? '-' : '';
  if (a >= 1e6) return `${s}$${(a / 1e6).toFixed(2)}M`;
  if (a >= 1e3) return `${s}$${Math.round(a / 1e3)}k`;
  return `${s}$${Math.round(a)}`;
};

export const pct = (n, d = 1) => `${n > 0 ? '+' : ''}${(n * 100).toFixed(d)}%`;
export const tonnes = (n) => `${n.toLocaleString('en-US')} t`;

export const LEVEL_STYLE = {
  Low: 'text-ok border-ok/40 bg-ok/10',
  Medium: 'text-warn border-warn/40 bg-warn/10',
  High: 'text-bad border-bad/50 bg-bad/10',
};
