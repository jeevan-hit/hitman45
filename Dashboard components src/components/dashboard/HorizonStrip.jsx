import React from 'react';

export default function HorizonStrip({ a }) {
  const checkpoints = [7, 30, 60, 90];
  const m = a.best?.vessel.mult ?? 1;
  return (
    <div className="grid grid-cols-4 gap-2">
      {checkpoints.map((d) => {
        const p = a.fc.points[d - 1];
        return (
          <div key={d} className="rounded-lg border border-line p-2.5 text-center">
            <p className="label-xs">{d}d</p>
            <p className="num text-sm text-txt font-semibold mt-1">${(p.mean * m).toFixed(1)}</p>
            <p className="num text-[10px] text-sub">${(p.lo * m).toFixed(0)}–${(p.hi * m).toFixed(0)}</p>
          </div>
        );
      })}
    </div>
  );
}
