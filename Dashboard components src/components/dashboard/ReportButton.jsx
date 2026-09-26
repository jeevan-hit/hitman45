import React, { useState } from 'react';
import { FileDown } from 'lucide-react';
import { generateReport } from '@/lib/freight/report';
import { useScenario } from '@/lib/freight/ScenarioContext';

export default function ReportButton() {
  const { analysis } = useScenario();
  const [busy, setBusy] = useState(false);
  const run = () => {
    setBusy(true);
    try { generateReport(analysis); } finally { setTimeout(() => setBusy(false), 300); }
  };
  return (
    <button onClick={run} disabled={busy}
      className="h-10 px-4 rounded-lg border border-neon/40 text-neon text-sm font-medium flex items-center gap-2 hover:bg-neon/10 transition-colors disabled:opacity-60">
      <FileDown className="w-4 h-4" />{busy ? 'Building…' : 'Download report'}
    </button>
  );
}
src/components/dashboard/ForecastChart.jsx
import React, { useMemo } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Line, ComposedChart } from 'recharts';
import Panel from '@/components/shared/Panel';
import ChartTooltip from '@/components/shared/ChartTooltip';
import { useScenario } from '@/lib/freight/ScenarioContext';
import { format } from 'date-fns';

export default function ForecastChart({ a }) {
  const data = useMemo(() => {
    const hist = a.history.slice(-90).map((h) => ({ date: format(h.date, 'dd MMM'), actual: h.rate, fc: null, lo: null, hi: null }));
    const fut = a.fc.points.map((p) => ({ date: format(p.date, 'dd MMM'), actual: null, fc: p.mean, lo: p.lo, hi: p.hi }));
    return [...hist, ...fut];
  }, [a]);
  const lastHist = a.history[a.history.length - 1].rate;
  return (
    <Panel eyebrow="90-day outlook" title="Freight-rate forecast · $/tonne">
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data} margin={{ top: 8, left: -10, right: 8 }}>
          <defs>
            <linearGradient id="band" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00E5FF" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#00E5FF" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1F2937" strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} minTickGap={24} />
          <YAxis tick={{ fill: '#9CA3AF', fontSize: 11 }} axisLine={false} tickLine={false} width={44} domain={['auto', 'auto']} />
          <Tooltip content={<ChartTooltip prefix="$" />} />
          <ReferenceLine y={lastHist} stroke="#6B7280" strokeDasharray="4 4" label={{ value: 'today', fill: '#9CA3AF', fontSize: 10, position: 'right' }} />
          <Area dataKey="hi" name="High" stroke="none" fill="url(#band)" />
          <Area dataKey="lo" name="Low" stroke="none" fill="#090D16" />
          <Line dataKey="actual" name="History" stroke="#3B82F6" strokeWidth={2} dot={false} connectNulls={false} />
          <Line dataKey="fc" name="Forecast" stroke="#00E5FF" strokeWidth={2} strokeDasharray="5 4" dot={false} connectNulls={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </Panel>
  );
}
