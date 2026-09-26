import React from 'react';
export default function Panel({ eyebrow, title, action, children }) {
  return (
    <section className="bg-panel border border-line rounded-xl p-4">
      {(eyebrow || title || action) && (
        <header className="flex items-start justify-between mb-3">
          <div>
            {eyebrow && <p className="label-xs mb-1">{eyebrow}</p>}
            {title && <h3 className="font-semibold text-txt text-base">{title}</h3>}
          </div>
          {action}
        </header>
      )}
      {children}
    </section>
  );
}
