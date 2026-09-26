import React, { useState } from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, ReferenceLine } from 'recharts';
import { VESSELS, PORTS } from '@/lib/freight/data';

export default function VesselClassChart() {
  const [portId, setPortId] = useState(PORTS[0].id);
  const port = PORTS.find((p) => p.id === portId);
  const data = VESSELS.map((v) => ({ name: v.name, draft: v.draft, fits: v.draft <= port.maxDraft, cost: v.mult * 100 }));
  return (
    <div className="rounded-xl border border-line bg-panel p-4">
      <div className="flex flex-wrap gap-1.5 mb-4">
        {PORTS.map((p) => (
          <button key={p.id} onClick={() => setPortId(p.id)} className={`text-xs px-2.5 py-1.5 rounded-lg border ${p.id === portId ? 'border-neon text-neon bg-neon/10' : 'border-line text-sub hover:text-txt'}`}>{p.name}</button>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 8, left: -10, right: 8 }}>
          <XAxis dataKey="name" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis label={{ value: 'draft (m)', fill: '#9CA3AF', fontSize: 10, angle: -90, position: 'insideLeft' }} tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} width={40} />
          <Tooltip contentStyle={{ background: '#111827', border: '1px solid #1F2937', borderRadius: 8, fontSize: 12 }} />
          <ReferenceLine y={port.maxDraft} stroke="#EF4444" strokeDasharray="4 4" label={{ value: `${port.name} limit`, fill: '#EF4444', fontSize: 10, position: 'top' }} />
          <Bar dataKey="draft" radius={[4, 4, 0, 0]}>
            {data.map((d) => <Cell key={d.name} fill={d.fits ? '#10B981' : '#EF4444'} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-2 mt-3">
        {data.map((d) => (
          <div key={d.name} className={`text-xs px-2 py-1.5 rounded-lg border ${d.fits ? 'border-ok/40 text-ok' : 'border-bad/40 text-bad'}`}>
            {d.name}: {d.fits ? 'fits' : 'too deep'}
          </div>
        ))}
      </div>
    </div>
  );
}
