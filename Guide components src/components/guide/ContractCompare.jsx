import React from 'react';
import { Lock, Zap } from 'lucide-react';

const SPOT = [24, 31, 22, 36, 28, 33];

export default function ContractCompare() {
  const spotTotal = SPOT.reduce((a, b) => a + b, 0);
  const lock = 28;
  const contractTotal = lock * SPOT.length;
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-line bg-panel p-5">
        <div className="flex items-center gap-2 mb-3"><Zap className="w-5 h-5 text-warn" /><p className="text-sm font-semibold text-txt">Spot — book each month</p></div>
        <div className="space-y-1.5">
          {SPOT.map((r, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-sub w-8">M{i + 1}</span>
              <div className="flex-1 h-5 rounded bg-line overflow-hidden"><div className="h-full bg-warn" style={{ width: `${(r / 40) * 100}%` }} /></div>
              <span className="num text-xs text-txt w-10 text-right">${r}</span>
            </div>
          ))}
        </div>
        <p className="num text-lg text-txt font-semibold mt-3">${spotTotal} total</p>
      </div>
      <div className="rounded-xl border border-neon/30 bg-neon/5 p-5">
        <div className="flex items-center gap-2 mb-3"><Lock className="w-5 h-5 text-neon" /><p className="text-sm font-semibold text-txt">Contract — lock once</p></div>
        <div className="space-y-1.5">
          {SPOT.map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-xs text-sub w-8">M{i + 1}</span>
              <div className="flex-1 h-5 rounded bg-line overflow-hidden"><div className="h-full bg-neon" style={{ width: `${(lock / 40) * 100}%` }} /></div>
              <span className="num text-xs text-txt w-10 text-right">${lock}</span>
            </div>
          ))}
        </div>
        <p className="num text-lg text-neon font-semibold mt-3">${contractTotal} total</p>
        <p className="text-xs text-ok mt-1">Save ${spotTotal - contractTotal} vs spot</p>
      </div>
    </div>
  );
}
