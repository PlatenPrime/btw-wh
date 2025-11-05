import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  CalculationStatusContainer,
  CalculationStatusSkeleton,
} from "@/modules/defs/components/containers/calculation-status-container";
import { DefsContainer } from "@/modules/defs/components/containers/defs-container/DefsContainer";
import { DefsContainerSkeleton } from "@/modules/defs/components/containers/defs-container/DefsContainerSkeleton";
import { DefControls } from "@/modules/defs/components/controls/def-controls/DefControls";
import { CalculationStatusFetcher } from "@/modules/defs/components/fetchers/calc-defs-status-fetcher/CalculationStatusFetcher";
import { LatestDefsFetcher } from "@/modules/defs/components/fetchers/latest-defs-fetcher/LatestDefsFetcher";
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
