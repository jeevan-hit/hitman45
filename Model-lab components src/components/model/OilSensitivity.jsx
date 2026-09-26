import React from 'react';
import Panel from '@/components/shared/Panel';
import { usd } from '@/lib/freight/format';

export default function OilSensitivity({ oil }) {
  if (!oil) return null;
  return (
    <Panel eyebrow="What the model learned from oil" title="Oil-price sensitivity">
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg border border-line p-3"><p className="label-xs">Learned coefficient</p><p className="num text-lg text-neon font-semibold mt-1">{usd(oil.coef, 3)}</p><p className="text-xs text-sub">per $/bbl of Brent</p></div>
        <div className="rounded-lg border border-line p-3"><p className="label-xs">Oil now</p><p className="num text-lg text-txt font-semibold mt-1">${oil.lastOil.toFixed(1)}</p><p className="text-xs text-sub">/bbl</p></div>
        <div className="rounded-lg border border-line p-3"><p className="label-xs">Oil mean-reverts to</p><p className="num text-lg text-txt font-semibold mt-1">${oil.oilMean.toFixed(1)}</p><p className="text-xs text-sub">12-mo average</p></div>
      </div>
      <p className="text-sm text-sub mt-3">A real regression learned that each $1/barrel of oil moves this route's freight by about <span className="num text-neon">{usd(oil.coef, 3)}/t</span>. The forecast projects oil mean-reverting toward its recent average, then feeds that into the rate prediction — so the model reacts to fuel costs, not just the trend.</p>
    </Panel>
  );
}
