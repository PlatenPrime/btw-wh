import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  CalculationStatusContainer,
  CalculationStatusSkeleton,
} from "@/modules/defs/components/containers/calculation-status-container";
import {
  DefsContainer,
  DefsContainerSkeleton,
} from "@/modules/defs/components/containers/defs-container";
import { DefControls } from "@/modules/defs/components/controls/def-controls/DefControls";
import { CalculationStatusFetcher } from "@/modules/defs/components/fetchers/calc-defs-status-fetcher";
import { LatestDefsFetcher } from "@/modules/defs/components/fetchers/latest-defs-fetcher";
import { useState } from "react";

export function Defs() {
  const [, setIsCalculationRunning] = useState(false);

  const handleStatusChange = (isRunning: boolean) => {
    setIsCalculationRunning(isRunning);
  };

  return (
    <SidebarInsetLayout headerText="Дефіцити">
      <main className="grid gap-2 p-2">
        <DefControls />

        <CalculationStatusFetcher
          enabled={true}
          onStatusChange={handleStatusChange}
          ContainerComponent={CalculationStatusContainer}
          SkeletonComponent={CalculationStatusSkeleton}
        />

        <LatestDefsFetcher
          ContainerComponent={DefsContainer}
          SkeletonComponent={DefsContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
