import React from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerClose } from '@/components/ui/drawer';
import { useScenario } from '@/lib/freight/ScenarioContext';
import CargoControls from '@/components/dashboard/CargoControls';
import { X } from 'lucide-react';

export default function MobileScenarioDrawer() {
  const { params, update, drawerOpen, setDrawerOpen } = useScenario();
  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerContent className="bg-panel border-line">
        <DrawerHeader className="flex items-center justify-between">
          <DrawerTitle className="text-txt">Scenario settings</DrawerTitle>
          <DrawerClose asChild><button className="text-sub"><X className="w-5 h-5" /></button></DrawerClose>
        </DrawerHeader>
        <div className="px-4 pb-8"><CargoControls value={params} onChange={update} /></div>
      </DrawerContent>
    </Drawer>
  );
}
