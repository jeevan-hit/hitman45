import React from 'react';
import { Outlet } from 'react-router-dom';
import { ScenarioProvider } from '@/lib/freight/ScenarioContext';
import TopNav from './TopNav';
import MobileHeader from './MobileHeader';
import MobileNav from './MobileNav';
import MobileScenarioDrawer from './MobileScenarioDrawer';

export default function AppLayout() {
  return (
    <ScenarioProvider>
      <div className="min-h-screen bg-ink text-txt overflow-x-hidden">
        <TopNav />
        <MobileHeader />
        <main className="max-w-[1600px] mx-auto px-4 md:px-6 py-5 md:py-6 pb-24 md:pb-10">
          <Outlet />
        </main>
        <MobileNav />
        <MobileScenarioDrawer />
      </div>
    </ScenarioProvider>
  );
}
