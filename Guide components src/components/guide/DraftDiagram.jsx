import React from 'react';

const Ship = ({ x, draft, color }) => (
  <g transform={`translate(${x},0)`}>
    <rect x="0" y="70" width="80" height="14" rx="2" fill={color} />
    <rect x="10" y="64" width="60" height="6" fill={color} />
    <rect x="0" y="84" width="80" height={draft} fill={color} opacity="0.35" />
  </g>
);

export default function DraftDiagram() {
  return (
    <div className="rounded-xl border border-line bg-panel p-4">
      <svg viewBox="0 0 320 160" className="w-full">
        <rect x="0" y="84" width="320" height="40" fill="#1e3a5f" opacity="0.4" />
        <line x1="0" y1="84" x2="320" y2="84" stroke="#3B82F6" strokeWidth="1" strokeDasharray="4 4" />
        <text x="6" y="80" fill="#3B82F6" fontSize="9">sea level</text>
        <Ship x="20" draft="10" color="#10B981" />
        <Ship x="200" draft="22" color="#EF4444" />
        <rect x="0" y="124" width="320" height="36" fill="#3a2e1f" />
        <line x1="0" y1="124" x2="320" y2="124" stroke="#6B7280" strokeWidth="1" strokeDasharray="4 4" />
        <text x="6" y="140" fill="#9CA3AF" fontSize="9">seabed (port depth 18m)</text>
        <text x="40" y="60" fill="#10B981" fontSize="9">10m ✓</text>
        <text x="220" y="60" fill="#EF4444" fontSize="9">22m ✗</text>
      </svg>
      <p className="text-xs text-sub mt-2 text-center">Draft = how deep the ship sits in the water. If draft &gt; port depth, the ship hits the seabed.</p>
    </div>
  );
}
