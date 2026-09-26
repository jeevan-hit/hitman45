import { jsPDF } from 'jspdf';
import { format } from 'date-fns';
import { usd, usdShort, tonnes, pct } from './format';

export function generateReport(a) {
  const p = a.params;
  const doc = new jsPDF({ unit: 'pt', format: 'a4' });
  const W = doc.internal.pageSize.getWidth();
  const M = 48;
  let y = 56;
  const ink = [9, 13, 22];
  const neon = [0, 229, 255];
  const sub = [124, 134, 150];

  const title = (t, size = 20, color = ink) => {
    doc.setFont('helvetica', 'bold'); doc.setFontSize(size); doc.setTextColor(...color);
    doc.text(t, M, y); y += size + 8;
  };
  const body = (t, size = 11, color = sub) => {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(size); doc.setTextColor(...color);
    const lines = doc.splitTextToSize(t, W - 2 * M);
    doc.text(lines, M, y); y += lines.length * (size + 4);
  };
  const kv = (label, value) => {
    doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(...sub);
    doc.text(label, M, y);
    doc.setFont('helvetica', 'bold'); doc.setTextColor(...ink);
    doc.text(String(value), M + 180, y);
    y += 16;
  };
  const rule = () => { doc.setDrawColor(230, 234, 240); doc.line(M, y, W - M, y); y += 14; };
  const gap = (h = 8) => { y += h; };

  // Header band
  doc.setFillColor(...ink); doc.rect(0, 0, W, 40, 'F');
  doc.setTextColor(...neon); doc.setFont('helvetica', 'bold'); doc.setFontSize(14);
  doc.text('SAIL Freight AI — Scenario Report', M, 26);

  y = 70;
  title('Decision support summary', 18);
  body(`Generated ${format(new Date(), 'dd MMM yyyy, HH:mm')} (Asia/Calcutta)`, 9);

  gap();
  title('Scenario', 13, ink);
  kv('Route', `${a.origin.name} → ${a.port.name}`);
  kv('Cargo', `${p.cargo} · ${tonnes(p.volume)} per shipment`);
  kv('Contract window', `${p.months} month(s)`);
  kv('Loading port', a.origin.loadPort);
  rule();

  title('Forecast', 13, ink);
  const mult = a.best?.vessel.mult ?? 1;
  kv('Current spot rate', `${usd(a.current * mult, 2)}/t`);
  kv('30-day predicted', `${usd(a.fc.points[29].mean * mult, 2)}/t (${pct(a.change30)})`);
  kv('Best booking window', `Days ${a.window.start}–${a.window.end} at ${usd(a.window.minRate * mult, 2)}/t`);
  if (a.fc.oil) kv('Oil sensitivity (learned)', `${usd(a.fc.oil.coef, 3)}/t per $/bbl of Brent`);
  rule();

  title('Vessel eligibility', 13, ink);
  if (a.best) {
    kv('Recommended vessel', a.best.vessel.name);
    kv('Voyages per shipment', a.best.voyages);
    kv('Landed cost', `${usd(a.best.effective, 2)}/t (incl. port waiting)`);
    body(`${a.vessels.filter((v) => !v.compatible).map((v) => v.vessel.name).join(', ') || 'All classes'} fit ${a.port.name}.`, 9);
  } else {
    body(`No vessel class physically fits ${a.port.name}.`, 10, [239, 68, 68]);
  }
  rule();

  title('Strategy: spot vs multiple-voyage contract', 13, ink);
  if (a.strategy) {
    kv('Spot cost (forecast)', usdShort(a.strategy.spotCost));
    kv('Contract cost (locked)', usdShort(a.strategy.contractCost));
    kv('Estimated saving', usdShort(Math.max(0, a.strategy.savings)));
    kv('Recommendation', a.strategy.recommend);
    kv('Lock rate', `${usd(a.strategy.lockRate, 2)}/t`);
  } else {
    body('No compatible vessel — no strategy computed.', 10);
  }
  rule();

  title('Risk summary', 13, ink);
  kv('Overall risk', a.risk.overall);
  a.risk.items.forEach((it) => { kv(it.name, it.level); body(it.why, 9); });

  if (a.decisionBt) {
    rule();
    title('Historical decision backtest', 13, ink);
    kv('Windows tested', a.decisionBt.count);
    kv('Win rate', `${(a.decisionBt.accuracy * 100).toFixed(0)}% advised correctly`);
    kv('Cumulative saving (sim)', usdShort(a.decisionBt.totalSaving));
    body('Replayed the strategy over the last ~2 years of history using only data available at each point. Shows whether following the advice would have saved money.', 9);
  }

  rule();
  body('Prototype · market data is simulated with realistic patterns. Vessel/port values are indicative. Not for operational use without licensed data.', 8, sub);

  doc.save(`freight-report-${a.origin.id}-${a.port.id}.pdf`);
}
