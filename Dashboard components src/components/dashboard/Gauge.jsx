import React from 'react';

export default function Gauge({ value, max = 100, label, tone = '#00E5FF' }) {
  const pctVal = Math.min(100, (value / max) * 100);
  return (
    <div>
      <div className="flex justify-between mb-1">
        <p className="label-xs">{label}</p>
        <p className="num text-sm text-txt font-semibold">{value}</p>
      </div>
      <div className="h-2 rounded-full bg-line overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${pctVal}%`, background: tone }} />
      </div>
    </div>
  );
}
