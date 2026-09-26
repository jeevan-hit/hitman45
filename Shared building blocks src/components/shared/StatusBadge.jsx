import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const STYLES = {
  pass: 'text-ok border-ok/40 bg-ok/10',
  warn: 'text-warn border-warn/40 bg-warn/10',
  fail: 'text-bad border-bad/50 bg-bad/10',
};
const ICONS = { pass: CheckCircle2, warn: AlertTriangle, fail: XCircle };

export default function StatusBadge({ status, children }) {
  const Icon = ICONS[status] ?? CheckCircle2;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded border ${STYLES[status] ?? STYLES.pass}`}>
      <Icon className="w-3 h-3" />{children}
    </span>
  );
}
src/components/shared/ChartTooltip.jsx
import React from 'react';
const fmt = (n, prefix) => (n == null ? '—' : prefix + n.toLocaleString('en-US', { maximumFractionDigits: 1 }));

export default function ChartTooltip({ active, payload, label, prefix = '' }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-panel border border-line rounded-lg px-3 py-2 text-xs">
      <p className="text-txt font-medium mb-1">{label}</p>
      {payload.filter((p) => p.value != null).map((p) => (
        <p key={p.name} className="flex items-center gap-2 text-sub">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          {p.name}: <span className="num text-txt">{fmt(p.value, prefix)}</span>
        </p>
      ))}
    </div>
  );
}
11. Dashboard components
src/components/dashboard/DashHeader.jsx
import React from 'react';
import { Info } from 'lucide-react';
import { tonnes } from '@/lib/freight/format';
import ReportButton from './ReportButton';

export default function DashHeader({ a, params }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <p className="label-xs mb-1 flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-neon" />Live scenario</p>
        <h1 className="font-mono font-bold text-txt text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">{a.origin.name} → {a.port.name}</h1>
        <p className="text-sub text-sm mt-1">{tonnes(params.volume)} {params.cargo.toLowerCase()} per shipment · {params.months}-month window · loading at {a.origin.loadPort}</p>
      </div>
      <div className="flex items-center gap-2">
        <ReportButton />
        <span className="inline-flex items-center gap-1.5 text-xs text-sub border border-line rounded-lg px-2.5 py-1.5">
          <Info className="w-3.5 h-3.5" /> Prototype · simulated market data
        </span>
      </div>
    </div>
  );
}
