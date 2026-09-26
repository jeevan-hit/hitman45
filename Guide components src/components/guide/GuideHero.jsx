import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, ShieldCheck, Calculator, ClipboardCheck } from 'lucide-react';

const STEPS = [
  { icon: Brain, t: 'Predict', d: 'Forecast freight rates' },
  { icon: ShieldCheck, t: 'Validate', d: 'Check port & vessel' },
  { icon: Calculator, t: 'Optimize', d: 'Find the cheapest ship' },
  { icon: ClipboardCheck, t: 'Decide', d: 'Spot vs contract' },
];

export default function GuideHero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-panel p-6 md:p-10 mb-6">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-neon/10 rounded-full blur-3xl" />
      <div className="relative">
        <p className="label-xs mb-3 text-neon">Decision-support platform for bulk cargo procurement</p>
        <h1 className="font-mono font-bold text-txt text-[clamp(1.75rem,4vw,3rem)] leading-tight max-w-3xl">Move from spot chaos to<br />optimized multi-voyage chartering.</h1>
        <p className="text-sub text-sm md:text-base mt-4 max-w-2xl">SAIL tells you the freight rate for tomorrow, which ship fits the port, and whether to lock a contract now or wait — built for SIH26006.</p>
        <div className="flex flex-wrap gap-3 mt-6">
          <Link to="/" className="h-11 px-5 rounded-lg bg-neon text-ink text-sm font-semibold flex items-center gap-2 hover:brightness-110">Open command center <ArrowRight className="w-4 h-4" /></Link>
          <Link to="/model" className="h-11 px-5 rounded-lg border border-line text-txt text-sm font-medium flex items-center gap-2 hover:bg-line/50">See the model <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.t} className="rounded-xl border border-line p-3">
                <Icon className="w-5 h-5 text-neon mb-2" />
                <p className="text-sm font-semibold text-txt">{s.t}</p>
                <p className="text-xs text-sub">{s.d}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
