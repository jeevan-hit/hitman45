import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const TIERS = [
  { n: 'Level 0', t: 'Naive baseline', d: 'Tomorrow = today. Hard to beat — start here.', tag: 'live', tone: 'text-ok' },
  { n: 'Level 1', t: 'Seasonal + Holt + oil', d: 'What this prototype runs. Interpretable, beats naive on most routes.', tag: 'live', tone: 'text-ok' },
  { n: 'Level 2', t: 'ARIMA / Prophet', d: 'Auto-tuned univariate — next upgrade once data is real.', tag: 'next', tone: 'text-neon' },
  { n: 'Level 3', t: 'Gradient boosting / LSTM', d: 'Multivariate, learns route interactions. Needs more features & data.', tag: 'later', tone: 'text-sub' },
];

export default function ModelLadder() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {TIERS.map((t) => (
          <div key={t.n} className="rounded-xl border border-line bg-panel p-4">
            <div className="flex items-center justify-between">
              <p className="label-xs">{t.n}</p>
              <span className={`text-[10px] px-1.5 py-0.5 rounded border ${t.tone === 'text-ok' ? 'border-ok/40 text-ok' : t.tone === 'text-neon' ? 'border-neon/40 text-neon' : 'border-line text-sub'}`}>{t.tag}</span>
            </div>
            <p className="text-sm font-semibold text-txt mt-1">{t.t}</p>
            <p className="text-xs text-sub mt-1">{t.d}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 p-4 rounded-xl border border-neon/30 bg-neon/5 flex items-center justify-between">
        <div>
          <p className="text-sm text-txt font-medium">See Level 1 beating the naive baseline live</p>
          <p className="text-xs text-sub">Backtest, error metrics, and the oil regression on the model lab.</p>
        </div>
        <Link to="/model" className="h-9 px-4 rounded-lg bg-neon text-ink text-sm font-medium flex items-center gap-2 shrink-0">Open <ArrowRight className="w-4 h-4" /></Link>
      </div>
    </div>
  );
}
