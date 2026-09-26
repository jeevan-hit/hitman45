import React from 'react';
import Panel from '@/components/shared/Panel';
import StatusBadge from '@/components/shared/StatusBadge';
import { usd } from '@/lib/freight/format';

export default function EligibilityMatrix({ a, bare }) {
  const wrap = (children) => bare ? children : <Panel eyebrow="Vessel eligibility" title="Which ships can enter?">{children}</Panel>;
  return wrap(
    <div className="space-y-2">
      {a.vessels.map((v) => (
        <div key={v.vessel.id} className={`flex items-center justify-between rounded-lg border p-3 ${v.compatible ? 'border-line' : 'border-line/50 opacity-60'}`}>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium text-txt text-sm">{v.vessel.name}</p>
              {v === a.best && <span className="text-[10px] px-1.5 py-0.5 rounded bg-neon/15 text-neon border border-neon/30">RECOMMENDED</span>}
            </div>
            <p className="text-xs text-sub">{v.vessel.range} · {v.voyages} voyage(s) · {Math.round(v.utilization * 100)}% full</p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {v.checks.map((c) => <StatusBadge key={c.key} status={c.status}>{c.label} {c.value}{c.unit}</StatusBadge>)}
            </div>
          </div>
          <div className="text-right">
            <p className="num text-sm text-txt font-medium">{usd(v.effective, 2)}<span className="text-sub text-xs">/t</span></p>
            <p className="text-xs text-sub">landed</p>
          </div>
        </div>
      ))}
    </div>
  );
}
