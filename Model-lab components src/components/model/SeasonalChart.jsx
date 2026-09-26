import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine } from 'recharts';
import Panel from '@/components/shared/Panel';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function SeasonalChart({ S }) {
  const data = S.map((v, i) => ({ month: MONTHS[i], index: +v.toFixed(3) }));
  return (
    <Panel eyebrow="What the model learned" title="Seasonal pattern (monthly index)">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data} margin={{ top: 8, left: -20, right: 8 }}>
          <XAxis dataKey="month" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} width={40} domain={[0.9, 1.1]} />
          <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1F2937', borderRadius: 8, fontSize: 12 }} />
          <ReferenceLine y={1} stroke="#6B7280" strokeDasharray="4 4" />
          <Bar dataKey="index" radius={[3, 3, 0, 0]}>
            {data.map((d) => <Cell key={d.month} fill={d.index >= 1 ? '#EF4444' : '#10B981'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-sub mt-2">Above 1.0 = historically more expensive that month, below 1.0 = cheaper. The forecast multiplies this pattern onto the trend.</p>
    </Panel>
  );
}
