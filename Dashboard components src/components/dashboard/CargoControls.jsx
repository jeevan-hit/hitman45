import React from 'react';
import { Slider } from '@/components/ui/slider';
import { SCENARIOS, CARGO_TYPES } from '@/lib/freight/data';

export default function CargoControls({ value, onChange }) {
  return (
    <div className="space-y-4">
      <div>
        <p className="label-xs mb-2">Route preset</p>
        <div className="flex flex-wrap gap-1.5">
          {SCENARIOS.map((s) => (
            <button key={s.id} onClick={() => onChange({ origin: s.origin, dest: s.dest })}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${value.origin === s.origin && value.dest === s.dest ? 'border-neon text-neon bg-neon/10' : 'border-line text-sub hover:text-txt'}`}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="label-xs mb-2">Cargo type</p>
        <div className="flex flex-wrap gap-1.5">
          {CARGO_TYPES.map((c) => (
            <button key={c} onClick={() => onChange({ cargo: c })}
              className={`text-xs px-2.5 py-1.5 rounded-lg border transition-colors ${value.cargo === c ? 'border-neon text-neon bg-neon/10' : 'border-line text-sub hover:text-txt'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-between mb-2"><p className="label-xs">Cargo per shipment</p><p className="num text-sm text-txt">{value.volume.toLocaleString()} t</p></div>
        <Slider value={[value.volume]} min={10000} max={170000} step={5000} onValueChange={(v) => onChange({ volume: v[0] })} />
      </div>
      <div>
        <div className="flex justify-between mb-2"><p className="label-xs">Contract window</p><p className="num text-sm text-txt">{value.months} months</p></div>
        <Slider value={[value.months]} min={1} max={12} step={1} onValueChange={(v) => onChange({ months: v[0] })} />
      </div>
    </div>
  );
}
