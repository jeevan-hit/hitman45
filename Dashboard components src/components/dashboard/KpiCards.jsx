import React from 'react';
import { TrendingUp, TrendingDown, Anchor, CalendarClock } from 'lucide-react';
import { usd, pct, tonnes } from '@/lib/freight/format';

export default function KpiCards({ a }) {
  const m = a.best?.vessel.mult ?? 1;
  const cards = [
    { label: 'Current rate', value: usd(a.current * m, 2), unit: '/t', icon: Anchor, tone: 'text-txt' },
    { label: '30-day change', value: pct(a.change30), icon: a.change30 >= 0 ? TrendingUp : TrendingDown, tone: a.change30 >= 0 ? 'text-bad' : 'text-ok' },
    { label: 'Best window', value: `Day ${a.window.start}–${a.window.end}`, icon: CalendarClock, tone: 'text-neon' },
    { label: 'Recommended ship', value: a.best?.vessel.name ?? 'None fit', icon: Anchor, tone: a.best ? 'text-txt' : 'text-bad' },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((c) => {
        const Icon = c.icon;
        return (
          <div key={c.label} className="bg-panel border border-line rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <p className="label-xs">{c.label}</p>
              <Icon className={`w-4 h-4 ${c.tone}`} />
            </div>
            <p className={`num text-lg font-semibold ${c.tone}`}>{c.value}<span className="text-sub text-xs font-normal">{c.unit ?? ''}</span></p>
          </div>
        );
      })}
    </div>
  );
}
