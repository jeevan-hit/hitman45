import React from 'react';

export default function GuideSection({ num, title, intro, children }) {
  return (
    <section className="mb-6">
      <div className="flex items-baseline gap-3 mb-3">
        <span className="num text-neon text-2xl font-bold">{String(num).padStart(2, '0')}</span>
        <div>
          <h2 className="font-semibold text-txt text-lg md:text-xl">{title}</h2>
          {intro && <p className="text-sub text-sm mt-0.5 max-w-3xl">{intro}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}
