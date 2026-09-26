import React, { createContext, useContext, useMemo, useState } from 'react';
import { analyze } from './decision';

const Ctx = createContext(null);

export function ScenarioProvider({ children }) {
  const [params, setParams] = useState({ cargo: 'Coking coal', volume: 50000, origin: 'australia', dest: 'paradip', months: 3 });
  const [drawerOpen, setDrawerOpen] = useState(false);
  const analysis = useMemo(() => analyze(params), [params]);
  const update = (patch) => setParams((prev) => ({ ...prev, ...patch }));
  return (
    <Ctx.Provider value={{ params, update, analysis, drawerOpen, setDrawerOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export const useScenario = () => useContext(Ctx);
