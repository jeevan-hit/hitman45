import React from 'react';
import { Ruler, Maximize, MoveHorizontal, Timer } from 'lucide-react';

const TERMS = [
  { icon: Ruler, t: 'Draft', d: 'How deep the ship sits below the waterline.', ex: 'Capesize 18.2 m' },
  { icon: Maximize, t: 'LOA', d: 'Length overall — longest dimension of the ship.', ex: 'Capesize 292 m' },
  { icon: MoveHorizontal, t: 'Beam', d: 'Width of the ship at its widest point.', ex: 'Capesize 45 m' },
  { icon: Timer, t: 'Handling rate', d: 'Tonnes the port can unload per day.', ex: 'Paradip 60,000 t/d' },
];

export default function ConstraintGlossary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {TERMS.map((t) => {
        const Icon = t.icon;
        return (
          <div key={t.t} className="rounded-xl border border-line bg-panel p-4">
            <Icon className="w-5 h-5 text-neon mb-2" />
            <p className="text-sm font-semibold text-txt">{t.t}</p>
            <p className="text-xs text-sub mt-1">{t.d}</p>
            <p className="text-xs text-neon mt-2 num">e.g. {t.ex}</p>
          </div>
        );
      })}
    </div>
  );
}
