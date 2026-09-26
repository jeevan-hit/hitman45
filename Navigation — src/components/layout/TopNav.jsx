import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FlaskConical, Ship } from 'lucide-react';
import { NAV_ITEMS } from './navItems';

const ICONS = { LayoutDashboard, BookOpen, FlaskConical };

export default function TopNav() {
  const { pathname } = useLocation();
  return (
    <header className="hidden md:flex sticky top-0 z-30 bg-ink/80 backdrop-blur border-b border-line">
      <div className="max-w-[1600px] mx-auto w-full px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-neon/15 border border-neon/30 flex items-center justify-center"><Ship className="w-4 h-4 text-neon" /></div>
          <span className="font-mono font-bold text-txt">SAIL<span className="text-neon">.</span>freight</span>
        </Link>
        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon];
            const active = pathname === item.path;
            return (
              <Link key={item.path} to={item.path} className={`flex items-center gap-2 px-3 h-9 rounded-lg text-sm transition-colors ${active ? 'bg-neon/10 text-neon' : 'text-sub hover:text-txt hover:bg-line/50'}`}>
                <Icon className="w-4 h-4" />{item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
