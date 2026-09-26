import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, ReferenceLine, Tooltip } from 'recharts';
import Panel from '@/components/shared/Panel';
import ChartTooltip from '@/components/shared/ChartTooltip';
import { usdShort, pct } from '@/lib/freight/format';

export default function DecisionBacktest({ bt }) {
  if (!bt) return null;
  const data = bt.windows.map((w, i) => ({ name: `W${i + 1}`, saving: w.saving }));
  const positive = bt.accuracy >= 0.6;
  return (
    <Panel eyebrow="Does the advice actually work?" title="Decision backtest · replayed over ~2 years">
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="rounded-lg border border-line p-3"><p className="label-xs">Windows tested</p><p className="num text-xl text-txt font-semibold mt-1">{bt.count}</p></div>
        <div className="rounded-lg border border-line p-3"><p className="label-xs">Advice correct</p><p className={`num text-xl font-semibold mt-1 ${positive ? 'text-ok' : 'text-warn'}`}>{pct(bt.accuracy - 1, 0)}</p><p className="text-xs text-sub">{bt.wins}/{bt.count} windows saved money</p></div>
        <div className="rounded-lg border border-line p-3"><p className="label-xs">Cumulative saving</p><p className="num text-xl text-ok font-semibold mt-1">{usdShort(bt.totalSaving)}</p><p className="text-xs text-sub">vs always booking spot</p></div>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 8, left: -16, right: 4 }}>
          <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={usdShort} tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} width={56} />
          <ReferenceLine y={0} stroke="#9CA3AF" />
          <Tooltip content={<ChartTooltip prefix="$" />} cursor={{ fill: '#1F2937' }} />
          <Bar dataKey="saving" name="Saving vs spot" radius={[3, 3, 0, 0]}>
            {data.map((d) => <Cell key={d.name} fill={d.saving >= 0 ? '#10B981' : '#EF4444'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-sm text-sub mt-2">At each past month we ran the strategy using only data available then, then compared to the rates that actually happened. Green = our contract advice beat spot booking that month.</p>
    </Panel>
  );
}
