import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import Panel from '@/components/shared/Panel';
import ChartTooltip from '@/components/shared/ChartTooltip';
import { usdShort, usd } from '@/lib/freight/format';

export default function StrategyCard({ a }) {
  const s = a.strategy;
  if (!s) return <Panel eyebrow="Strategy" title="Spot vs contract"><p className="text-sm text-sub">No compatible vessel — no strategy computed.</p></Panel>;
  const data = s.parcels.map((p) => ({ name: p.name, Spot: Math.round(p.spot), Contract: Math.round(p.contract) }));
  return (
    <Panel eyebrow="Strategy" title={s.recommend} action={<span className={`text-xs px-2 py-1 rounded border ${s.savings > 0 ? 'text-ok border-ok/40 bg-ok/10' : 'text-warn border-warn/40 bg-warn/10'}`}>{usdShort(Math.abs(s.savings))} {s.savings > 0 ? 'save' : 'cost'}</span>}>
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="rounded-lg border border-line p-3"><p className="label-xs">Spot (forecast)</p><p className="num text-lg text-txt font-semibold mt-1">{usdShort(s.spotCost)}</p><p className="text-xs text-sub">book each month</p></div>
        <div className="rounded-lg border border-neon/30 bg-neon/5 p-3"><p className="label-xs">Contract lock</p><p className="num text-lg text-neon font-semibold mt-1">{usdShort(s.contractCost)}</p><p className="text-xs text-sub">@ {usd(s.lockRate, 2)}/t</p></div>
      </div>
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={data} margin={{ top: 4, left: -16, right: 4 }}>
          <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={usdShort} tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
          <Tooltip content={<ChartTooltip prefix="$" />} cursor={{ fill: '#1F2937' }} />
          <Bar dataKey="Spot" fill="#3B82F6" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Contract" fill="#00E5FF" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-sub mt-2">Lock the rate in the forecast's cheapest {a.window.start}–{a.window.end}-day window, then ship at that fixed price for {s.voyages} voyages.</p>
    </Panel>
  );
}
