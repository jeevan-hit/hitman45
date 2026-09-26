import React from 'react';
import { Droplet, Waves, Calendar, Anchor, TrendingUp, Fuel } from 'lucide-react';
import { ORIGINS, PORTS } from '@/lib/freight/data';

const CATS = [
  { icon: Fuel, t: 'Brent oil price', d: 'Fuel is the biggest variable cost for ships.' },
  { icon: Calendar, t: 'Seasonality', d: 'Monsoon & demand cycles move rates predictably.' },
  { icon: Waves, t: 'Port congestion', d: 'Waiting time = idle hire = higher effective cost.' },
  { icon: Anchor, t: 'Vessel availability', d: 'Fleet supply by class shifts charter rates.' },
  { icon: TrendingUp, t: 'Demand cycles', d: 'Commodity booms pull rates up across routes.' },
  { icon: Droplet, t: 'Cargo volume', d: 'Dead-freight penalties for under-filled ships.' },
];

export default function DataSources() {
  return (
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {CATS.map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.t} className="rounded-xl border border-line bg-panel p-4">
              <Icon className="w-5 h-5 text-neon mb-2" />
              <p className="text-sm font-semibold text-txt">{c.t}</p>
              <p className="text-xs text-sub mt-1">{c.d}</p>
            </div>
          );
        })}
      </div>
      <div className="rounded-xl border border-line bg-panel p-4">
        <p className="label-xs mb-3">Origins → East Coast India ports</p>
        <div className="space-y-2">
          {ORIGINS.map((o) => (
            <div key={o.id} className="flex items-center justify-between text-sm">
              <div><span className="text-txt font-medium">{o.name}</span><span className="text-sub text-xs"> · {o.loadPort}</span></div>
              <span className="num text-xs text-neon">{o.days}d transit</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-line">
          <p className="label-xs mb-2">Discharge ports</p>
          <div className="flex flex-wrap gap-1.5">
            {PORTS.map((p) => <span key={p.id} className="text-xs px-2 py-1 rounded-lg border border-line text-sub">{p.name}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
