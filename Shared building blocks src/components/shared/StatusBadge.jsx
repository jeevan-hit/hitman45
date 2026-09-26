import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

const STYLES = {
  pass: 'text-ok border-ok/40 bg-ok/10',
  warn: 'text-warn border-warn/40 bg-warn/10',
  fail: 'text-bad border-bad/50 bg-bad/10',
};
const ICONS = { pass: CheckCircle2, warn: AlertTriangle, fail: XCircle };

export default function StatusBadge({ status, children }) {
  const Icon = ICONS[status] ?? CheckCircle2;
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded border ${STYLES[status] ?? STYLES.pass}`}>
      <Icon className="w-3 h-3" />{children}
    </span>
  );
}
