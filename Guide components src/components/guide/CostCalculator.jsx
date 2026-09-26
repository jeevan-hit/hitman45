import React, { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { usd } from '@/lib/freight/format';

const SCENES = [
  { name: 'Cheap', rate: 12 },
  { name: 'Today', rate: 24 },
  { name: 'Expensive', rate: 38 },
];

export default function CostCalculator() {
  const [volume, setVolume] = useState(50000);
  const data = useMemo(() => SCENES.map((s) => ({ name: s.name, cost: s.rate * volume })), [volume]);
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="rounded-xl border border-line bg-panel p-4">
        <div className="flex justify-between mb-2"><p className="label-xs">Cargo</p><p className="num text-sm text-txt">{volume.toLocaleString()} t</p></div>
        <Slider value={[volume]} min={10000} max={170000} step={5000} onValueChange={(v) => setVolume(v[0])} />
        <div className="mt-6 p-4 rounded-lg bg-neon/5 border border-neon/30">
          <p className="label-xs">At today's rate ($24/t)</p>
          <p className="num text-3xl text-neon font-bold mt-1">{usd(24 * volume)}</p>
          <p className="text-xs text-sub">total freight bill</p>
        </div>
      </div>
      <div className="rounded-xl border border-line bg-panel p-4">
        <p className="label-xs mb-3">Same cargo, three markets</p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 8, left: -10, right: 8 }}>
            <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tickFormatter={(v) => '$' + (v / 1000) + 'k'} tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} width={48} />
            <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1F2937', borderRadius: 8, fontSize: 12 }} formatter={(v) => usd(v)} />
            <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
              {data.map((d, i) => <Cell key={d.name} fill={['#10B981', '#00E5FF', '#EF4444'][i]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-sub mt-2">A $14/t swing on 50,000 t = $700,000 difference. Tiny numbers, huge money.</p>
      </div>
    </div>
  );
}
