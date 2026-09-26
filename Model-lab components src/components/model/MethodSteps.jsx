import React from 'react';
import Panel from '@/components/shared/Panel';

export default function MethodSteps({ trainSize }) {
  const steps = [
    { n: 1, t: 'Generate history', d: `Seeded synthetic ${trainSize}-day series with season, cycle, oil and noise.` },
    { n: 2, t: 'Split chronologically', d: 'Train on the older 80%, hide the recent 60 days — no peeking.' },
    { n: 3, t: 'Deseasonalize', d: 'Divide each day by its monthly seasonal index (ratio-to-moving-average).' },
    { n: 4, t: 'Regress on oil', d: 'OLS learns the $/t-per-$/bbl coefficient, residual is what oil can\'t explain.' },
    { n: 5, t: 'Holt trend + oil forecast', d: 'Damped Holt on residuals; oil mean-reverts toward its 12-mo average.' },
    { n: 6, t: 'Re-seasonalize & score', d: 'Multiply back the seasonal factor; compare MAE/RMSE/MAPE vs naive.' },
  ];
  return (
    <Panel eyebrow="Method" title="How the forecast is made">
      <ol className="space-y-2">
        {steps.map((s) => (
          <li key={s.n} className="flex gap-3">
            <span className="num text-neon text-sm font-semibold shrink-0">{s.n}.</span>
            <div><p className="text-sm text-txt font-medium">{s.t}</p><p className="text-xs text-sub">{s.d}</p></div>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
