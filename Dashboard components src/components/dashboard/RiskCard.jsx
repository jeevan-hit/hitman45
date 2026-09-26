import React from 'react';
import Panel from '@/components/shared/Panel';
import { LEVEL_STYLE } from '@/lib/freight/format';

export default function RiskCard({ a }) {
  const r = a.risk;
  return (
    <Panel eyebrow="Risk assessment" title={`Overall: ${r.overall}`} action={<span className={`text-xs px-2 py-1 rounded border ${LEVEL_STYLE[r.overall]}`}>{r.overall}</span>}>
      <div className="space-y-2">
        {r.items.map((it) => (
          <div key={it.name} className="rounded-lg border border-line p-3">
            <div className="flex items-center justify-between mb-1">
              <p className="text-sm text-txt font-medium">{it.name}</p>
              <span className={`text-xs px-2 py-0.5 rounded border ${LEVEL_STYLE[it.level]}`}>{it.level}</span>
            </div>
            <p className="text-xs text-sub">{it.why}</p>
          </div>
        ))}
      </div>
    </Panel>
  );
}
