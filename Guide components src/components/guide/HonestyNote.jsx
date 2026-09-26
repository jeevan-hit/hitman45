import React from 'react';
import { AlertTriangle, Compass } from 'lucide-react';

export default function HonestyNote() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-warn/40 bg-warn/5 p-5">
        <div className="flex items-center gap-2 mb-2"><AlertTriangle className="w-5 h-5 text-warn" /><p className="text-sm font-semibold text-txt">Tell the truth about data</p></div>
        <p className="text-sm text-sub">Say "simulated with realistic patterns," not "live." Real AIS & freight feeds need licenses. Don't claim real-time without it.</p>
      </div>
      <div className="rounded-xl border border-neon/30 bg-neon/5 p-5">
        <div className="flex items-center gap-2 mb-2"><Compass className="w-5 h-5 text-neon" /><p className="text-sm font-semibold text-txt">What SAIL is for</p></div>
        <p className="text-sm text-sub">A decision-support cockpit: predict freight, validate the ship fits the port, optimize cost, and decide spot vs contract — not a black box.</p>
      </div>
    </div>
  );
}
