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
