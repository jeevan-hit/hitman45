import React, { useMemo } from 'react';
import Panel from '@/components/shared/Panel';
import { routeMatrix } from '@/lib/freight/model';
import { pct } from '@/lib/freight/format';

const cellColor = (change) => {
  const t = Math.max(-0.08, Math.min(0.08, change));
  if (t >= 0) return `rgba(239, 68, 68, ${0.15 + (t / 0.08) * 0.5})`;
  return `rgba(16, 185, 129, ${0.15 + (Math.abs(t) / 0.08) * 0.5})`;
};

export default function RouteHeatmap() {
  const matrix = useMemo(() => routeMatrix(), []);
  return (
    <Panel eyebrow="All routes at a glance" title="30-day rate outlook · origin × destination">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="text-left text-xs text-sub font-medium p-2">From ↓ / To →</th>
              {matrix[0].cells.map((c) => <th key={c.port.id} className="text-xs text-sub font-medium p-2 text-center">{c.port.short ?? c.port.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {matrix.map((row) => (
              <tr key={row.origin.id}>
                <td className="text-xs text-txt font-medium p-2">{row.origin.short}</td>
                {row.cells.map((c) => (
                  <td key={c.port.id} className="p-1">
                    <div className="rounded-md p-2 text-center" style={{ background: cellColor(c.change) }}>
                      <p className="num text-xs text-txt font-medium">{pct(c.change, 0)}</p>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
