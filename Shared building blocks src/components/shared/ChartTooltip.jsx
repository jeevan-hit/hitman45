import React from 'react';
const fmt = (n, prefix) => (n == null ? '—' : prefix + n.toLocaleString('en-US', { maximumFractionDigits: 1 }));

export default function ChartTooltip({ active, payload, label, prefix = '' }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-panel border border-line rounded-lg px-3 py-2 text-xs">
      <p className="text-txt font-medium mb-1">{label}</p>
      {payload.filter((p) => p.value != null).map((p) => (
        <p key={p.name} className="flex items-center gap-2 text-sub">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="num text-txt">{fmt(p.value, prefix)}</span>
        </p>
      ))}
    </div>
  );
}
