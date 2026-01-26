import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { DefsHeaderActions } from "@/modules/defs/components/actions/defs-header-actions";
import {
  CalculationStatusContainer,
  CalculationStatusSkeleton,
} from "@/modules/defs/components/containers/calculation-status-container";
import {
  DefsContainer,
  DefsContainerSkeleton,
} from "@/modules/defs/components/containers/defs-container";
import { CalculationStatusFetcher } from "@/modules/defs/components/fetchers/calc-defs-status-fetcher";
import { LatestDefsFetcher } from "@/modules/defs/components/fetchers/latest-defs-fetcher";

export function Defs() {
  return (
    <SidebarInsetLayout headerText="Дефіцити">
      <DefsHeaderActions />
      <main className="grid gap-2 p-2">
        <CalculationStatusFetcher
          enabled={true}
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
