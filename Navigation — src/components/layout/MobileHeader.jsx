import React from 'react';
import { useScenario } from '@/lib/freight/ScenarioContext';
import { Ship, SlidersHorizontal } from 'lucide-react';

export default function MobileHeader() {
  const { setDrawerOpen, analysis: a } = useScenario();
  return (
    <header className="md:hidden sticky top-0 z-30 bg-ink/80 backdrop-blur border-b border-line h-14 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-neon/15 border border-neon/30 flex items-center justify-center"><Ship className="w-4 h-4 text-neon" /></div>
        <span className="font-mono font-bold text-txt text-sm">SAIL<span className="text-neon">.</span>freight</span>
      </div>
      <button onClick={() => setDrawerOpen(true)} className="h-9 px-3 rounded-lg border border-line text-sub flex items-center gap-1.5 text-sm"><SlidersHorizontal className="w-4 h-4" />{a.origin.short} → {a.port.name}</button>
    </header>
  );
}
