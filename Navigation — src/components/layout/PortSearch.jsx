import React, { useMemo, useState } from 'react';
import { ORIGINS, PORTS } from '@/lib/freight/data';
import { useScenario } from '@/lib/freight/ScenarioContext';
import { Search } from 'lucide-react';

export default function PortSearch() {
  const { update, params } = useScenario();
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    if (!q) return [];
    const ql = q.toLowerCase();
    return PORTS.filter((p) => p.name.toLowerCase().includes(ql) || p.state.toLowerCase().includes(ql)).slice(0, 5);
  }, [q]);
  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sub" />
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search discharge port…" className="w-full h-10 pl-9 pr-3 rounded-lg bg-ink border border-line text-sm text-txt focus:border-neon outline-none" />
      </div>
      {results.length > 0 && (
        <div className="absolute mt-1 w-full bg-panel border border-line rounded-lg shadow-xl z-20">
          {results.map((p) => (
            <button key={p.id} onClick={() => { update({ dest: p.id }); setQ(''); }} className="w-full text-left px-3 py-2 hover:bg-line/50 flex items-center justify-between">
              <span className="text-sm text-txt">{p.name}</span><span className="text-xs text-sub">{p.state}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
