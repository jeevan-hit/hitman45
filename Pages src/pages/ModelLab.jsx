import React, { useMemo } from 'react';
import { useScenario } from '@/lib/freight/ScenarioContext';
import { backtest } from '@/lib/freight/model';
import BacktestChart from '@/components/model/BacktestChart';
import MetricsTable from '@/components/model/MetricsTable';
import SeasonalChart from '@/components/model/SeasonalChart';
import MethodSteps from '@/components/model/MethodSteps';
import OilSensitivity from '@/components/model/OilSensitivity';
import DecisionBacktest from '@/components/model/DecisionBacktest';

export default function ModelLab() {
  const { analysis: a } = useScenario();
  const bt = useMemo(() => backtest(a.history, 60), [a.history]);
  return (
    <div className="space-y-5">
      <div>
        <p className="label-xs mb-1">Model lab · no fake AI</p>
        <h1 className="font-mono font-bold text-txt text-[clamp(1.75rem,3vw,2.5rem)] leading-tight">Testing the forecast: {a.origin.name} → {a.port.name}</h1>
        <p className="text-sub text-sm mt-1 max-w-3xl">Judges will ask "how did your model get this number?" This page shows the answer: train on the past, hide recent data, forecast it, and compare against a simple guess. Switch routes from the top bar.</p>
      </div>
      <OilSensitivity oil={a.fc.oil} />
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,65fr)_minmax(0,35fr)] gap-5">
        <div className="space-y-5 min-w-0">
          <BacktestChart rows={bt.rows} />
          <DecisionBacktest bt={a.decisionBt} />
          <SeasonalChart S={a.fc.S} />
        </div>
        <div className="space-y-5 min-w-0">
          <MetricsTable bt={bt} />
          <MethodSteps trainSize={bt.trainSize} />
        </div>
      </div>
    </div>
  );
}
src/pages/Guide.jsx
import React from 'react';
import GuideHero from '@/components/guide/GuideHero';
import GuideSection from '@/components/guide/GuideSection';
import CostCalculator from '@/components/guide/CostCalculator';
import VesselClassChart from '@/components/guide/VesselClassChart';
import DraftDiagram from '@/components/guide/DraftDiagram';
import ConstraintGlossary from '@/components/guide/ConstraintGlossary';
import DataSources from '@/components/guide/DataSources';
import ModelLadder from '@/components/guide/ModelLadder';
import ContractCompare from '@/components/guide/ContractCompare';
import ArchitectureFlow from '@/components/guide/ArchitectureFlow';
import HonestyNote from '@/components/guide/HonestyNote';

export default function Guide() {
  return (
    <div>
      <GuideHero />
      <GuideSection num={1} title="What is freight, and why does $1 matter?" intro="Freight rate = the cost to carry one tonne of cargo by ship. Multiply by a huge cargo and tiny changes become big money. Play with the sliders.">
        <CostCalculator />
      </GuideSection>
      <GuideSection num={2} title="Chartering: renting the right ship" intro="SAIL doesn't own the ships — it rents (charters) them, like renting a truck. There are four common sizes. The biggest is cheapest per tonne, but it must fit the port.">
        <VesselClassChart />
      </GuideSection>
      <GuideSection num={3} title="Why can't we always use the biggest ship?" intro="Every port has physical limits. The system checks each ship against them before recommending anything.">
        <div className="grid lg:grid-cols-2 gap-4"><DraftDiagram /><ConstraintGlossary /></div>
      </GuideSection>
      <GuideSection num={4} title="What data feeds the forecast" intro="The model learns how these factors move freight prices on each route from the five origin countries to East Coast ports.">
        <DataSources />
      </GuideSection>
      <GuideSection num={5} title="Which AI models to use (and in what order)" intro="Don't start with the fanciest model. Prove you can beat a simple guess first, then add complexity only if it helps.">
        <ModelLadder />
      </GuideSection>
      <GuideSection num={6} title="The real business goal: spot → multiple-voyage" intro="Forecasting is the means. The end is moving from many one-off bookings to smarter short or medium-term contracts.">
        <ContractCompare />
      </GuideSection>
      <GuideSection num={7} title="The full system in one picture" intro="Predict → Validate → Optimize → Decide. It's a decision-support platform, not just a price predictor.">
        <ArchitectureFlow />
      </GuideSection>
      <GuideSection num={8} title="Presenting it to judges">
        <HonestyNote />
      </GuideSection>
    </div>
  );
}
