import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, FlaskConical } from 'lucide-react';
import { NAV_ITEMS } from './navItems';

const ICONS = { LayoutDashboard, BookOpen, FlaskConical };

export default function MobileNav() {
  const { pathname } = useLocation();
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 bg-ink/95 backdrop-blur border-t border-line h-16 flex">
      {NAV_ITEMS.map((item) => {
        const Icon = ICONS[item.icon];
        const active = pathname === item.path;
        return (
          <Link key={item.path} to={item.path} className={`flex-1 flex flex-col items-center justify-center gap-1 text-[10px] ${active ? 'text-neon' : 'text-sub'}`}>
            <Icon className="w-5 h-5" />{item.label}
          </Link>
        );
      })}
    </nav>
  );
}
