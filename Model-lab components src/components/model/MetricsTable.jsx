import React from 'react';
import Panel from '@/components/shared/Panel';

const Row = ({ label, model, naive }) => {
  const better = model < naive;
  return (
    <tr className="border-t border-line">
      <td className="py-2 text-sm text-sub">{label}</td>
      <td className={`py-2 num text-sm text-right ${better ? 'text-ok font-semibold' : 'text-txt'}`}>{model.toFixed(3)}</td>
      <td className="py-2 num text-sm text-right text-sub">{naive.toFixed(3)}</td>
      <td className={`py-2 text-xs text-right ${better ? 'text-ok' : 'text-bad'}`}>{better ? 'model wins' : 'naive wins'}</td>
    </tr>
  );
};

export default function MetricsTable({ bt }) {
  return (
    <Panel eyebrow="Accuracy" title="Error metrics (lower is better)">
      <table className="w-full">
        <thead>
          <tr className="text-xs text-sub">
            <th className="text-left font-medium pb-2">Metric</th>
            <th className="text-right font-medium pb-2">Our model</th>
            <th className="text-right font-medium pb-2">Naive</th>
            <th className="text-right font-medium pb-2">Verdict</th>
          </tr>
        </thead>
        <tbody>
          <Row label="MAE ($/t)" model={bt.model.mae} naive={bt.naive.mae} />
          <Row label="RMSE ($/t)" model={bt.model.rmse} naive={bt.naive.rmse} />
          <Row label="MAPE (%)" model={bt.model.mape} naive={bt.naive.mape} />
        </tbody>
      </table>
    </Panel>
  );
}
