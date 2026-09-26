import React from 'react';
import { Database, Brain, ShieldCheck, Calculator, LayoutDashboard } from 'lucide-react';

const STAGES = [
  { icon: Database, t: 'Ingest', d: 'Rates, oil, port limits, AIS (simulated proxy)' },
  { icon: Brain, t: 'Forecast', d: 'Seasonal + Holt + oil regression per route' },
  { icon: ShieldCheck, t: 'Validate', d: 'Vessel vs port draft/LOA/beam constraints' },
  { icon: Calculator, t: 'Optimize', d: 'Cheapest compatible vessel + booking window' },
  { icon: LayoutDashboard, t: 'Dashboard', d: 'KPIs, strategy, risk, decision support' },
];

export default function ArchitectureFlow() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
      {STAGES.map((s, i) => {
        const Icon = s.icon;
        return (
          <React.Fragment key={s.t}>
            <div className="rounded-xl border border-line bg-panel p-4 text-center">
              <div className="w-10 h-10 rounded-full bg-neon/10 border border-neon/30 flex items-center justify-center mx-auto mb-2">
                <Icon className="w-5 h-5 text-neon" />
              </div>
              <p className="text-sm font-semibold text-txt">{s.t}</p>
              <p className="text-xs text-sub mt-1">{s.d}</p>
            </div>
            {i < STAGES.length - 1 && <div className="hidden md:flex items-center justify-center text-sub">→</div>}
          </React.Fragment>
        );
      })}
    </div>
  );
}
