import { SidebarInsetLayout } from "@/components/shared/sidebar/sidebar-inset-layout";
import { DefControls } from "@/modules/defs/components/controls/def-controls/DefControls";
import { LatestDefsFetcher } from "@/modules/defs/components/fetchers/latest-defs-fetcher/LatestDefsFetcher";
import { CalculationStatusFetcher } from "@/modules/defs/components/status/calculation-status/CalculationStatusFetcher";
import { useEffect, useState } from "react";

export function Defs() {
  const [isMounted, setIsMounted] = useState(false);
  const [, setIsCalculationRunning] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleStatusChange = (isRunning: boolean) => {
    setIsCalculationRunning(isRunning);
  };

  return (
    <SidebarInsetLayout headerText="Дефіцити">
      <main className="grid gap-2 p-2">
        <DefControls />

        {isMounted && (
          <CalculationStatusFetcher
            enabled={true}
            onStatusChange={handleStatusChange}
          />
        )}

        <LatestDefsFetcher />
      </main>
    </SidebarInsetLayout>
  );
}
