import React from 'react';
import Panel from '@/components/shared/Panel';
import { usd } from '@/lib/freight/format';
import { LEVEL_STYLE } from '@/lib/freight/format';

export default function CongestionCard({ a }) {
  const c = a.congestion;
  return (
    <Panel eyebrow="Port congestion" title={a.port.name} action={<span className={`text-xs px-2 py-1 rounded border ${LEVEL_STYLE[c.status]}`}>{c.status}</span>}>
      <div className="flex items-end gap-3 mb-3">
        <div>
          <p className="num text-3xl text-txt font-bold">{c.hours}<span className="text-sub text-sm font-normal"> hrs</span></p>
          <p className="text-xs text-sub">waiting before berthing</p>
        </div>
        <div className="ml-auto text-right">
          <p className="num text-sm text-warn font-semibold">{usd(c.idleCost, 0)}</p>
          <p className="text-xs text-sub">idle hire cost</p>
        </div>
      </div>
      <div className="h-2 rounded-full bg-line overflow-hidden mb-3">
        <div className={`h-full rounded-full ${c.status === 'High' ? 'bg-bad' : c.status === 'Medium' ? 'bg-warn' : 'bg-ok'}`} style={{ width: `${c.level}%` }} />
      </div>
      {c.alternatives.length > 0 && (
        <div>
          <p className="label-xs mb-2">Less-congested alternatives</p>
          <div className="space-y-1.5">
            {c.alternatives.map((alt) => (
              <div key={alt.port.id} className="flex items-center justify-between text-sm">
                <span className="text-txt">{alt.port.name}</span>
                <span className="num text-ok">{alt.hours} hrs</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Panel>
  );
}
