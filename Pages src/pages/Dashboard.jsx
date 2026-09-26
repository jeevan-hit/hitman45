import React from 'react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useScenario } from '@/lib/freight/ScenarioContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Panel from '@/components/shared/Panel';
import DashHeader from '@/components/dashboard/DashHeader';
import KpiCards from '@/components/dashboard/KpiCards';
import ForecastChart from '@/components/dashboard/ForecastChart';
import CargoControls from '@/components/dashboard/CargoControls';
import EligibilityMatrix from '@/components/dashboard/EligibilityMatrix';
import StrategyCard from '@/components/dashboard/StrategyCard';
import CongestionCard from '@/components/dashboard/CongestionCard';
import RiskCard from '@/components/dashboard/RiskCard';
import RouteHeatmap from '@/components/dashboard/RouteHeatmap';

export default function Dashboard() {
  const isMobile = useIsMobile();
  const { params, update, analysis: a } = useScenario();

  if (isMobile) {
    return (
      <div className="space-y-4">
        <DashHeader a={a} params={params} />
        <KpiCards a={a} />
        <ForecastChart a={a} />
        <Accordion type="single" collapsible className="bg-panel border border-line rounded-xl px-4">
          <AccordionItem value="v" className="border-none">
            <AccordionTrigger className="text-txt hover:no-underline">Vessel eligibility · {a.best?.vessel.name ?? 'none fit'}</AccordionTrigger>
            <AccordionContent><EligibilityMatrix a={a} bare /></AccordionContent>
          </AccordionItem>
        </Accordion>
        <StrategyCard a={a} />
        <CongestionCard a={a} />
        <RiskCard a={a} />
        <RouteHeatmap />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <DashHeader a={a} params={params} />
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,35fr)_minmax(0,65fr)] gap-5">
        <div className="space-y-5 min-w-0">
          <Panel eyebrow="Input control" title="Cargo specification"><CargoControls value={params} onChange={update} /></Panel>
          <EligibilityMatrix a={a} />
          <RiskCard a={a} />
        </div>
        <div className="space-y-5 min-w-0">
          <KpiCards a={a} />
          <ForecastChart a={a} />
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <StrategyCard a={a} />
            <CongestionCard a={a} />
          </div>
          <RouteHeatmap />
        </div>
      </div>
    </div>
  );
}
