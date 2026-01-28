import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { PalletGroupsHeaderActions } from "@/modules/pallet-groups/components/actions/pallet-groups-header-actions";
import { PalletGroupsContainer } from "@/modules/pallet-groups/components/containers/pallet-groups-container/PalletGroupsContainer";
import { PalletGroupsContainerSkeleton } from "@/modules/pallet-groups/components/containers/pallet-groups-container/PalletGroupsContainerSkeleton";
import { PalletGroupsFetcher } from "@/modules/pallet-groups/components/fetchers/pallet-groups-fetcher/PalletGroupsFetcher";

export function PalletGroupsPage() {
  return (
    <SidebarInsetLayout headerText="Групи палет">
      <PalletGroupsHeaderActions />
      <PalletGroupsFetcher
        ContainerComponent={PalletGroupsContainer}
        SkeletonComponent={PalletGroupsContainerSkeleton}
      />
    </SidebarInsetLayout>
  );
}
