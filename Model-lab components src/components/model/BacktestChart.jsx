import React from 'react';
import { ResponsiveContainer, ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceArea } from 'recharts';
import Panel from '@/components/shared/Panel';
import ChartTooltip from '@/components/shared/ChartTooltip';
import { format } from 'date-fns';

export default function BacktestChart({ rows }) {
  const data = rows.map((r) => ({ date: format(r.date, 'dd MMM'), actual: r.actual, model: r.model, naive: r.naive, lo: r.lo, hi: r.hi }));
  return (
    <Panel eyebrow="Hold-out test (last 60 days)" title="Model vs naive baseline">
      <ResponsiveContainer width="100%" height={280}>
        <ComposedChart data={data} margin={{ top: 8, left: -10, right: 8 }}>
          <defs>
            <linearGradient id="btband" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 10 }} axisLine={false} tickLine={false} minTickGap={20} />
          <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} width={44} domain={['auto', 'auto']} />
          <Tooltip content={<ChartTooltip prefix="$" />} />
          <Area dataKey="hi" name="High" stroke="none" fill="url(#btband)" />
          <Area dataKey="lo" name="Low" stroke="none" fill="#090D16" />
          <Line dataKey="actual" name="Actual" stroke="#F9FAFB" strokeWidth={2} dot={false} />
          <Line dataKey="model" name="Our model" stroke="#00E5FF" strokeWidth={2} dot={false} />
          <Line dataKey="naive" name="Naive" stroke="#6B7280" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </Panel>
  );
}
