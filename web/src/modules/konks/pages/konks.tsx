import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  KonksContainer,
  KonksContainerSkeleton,
} from "@/modules/konks/components/containers/konks-container";
import { KonksFetcher } from "@/modules/konks/components/fetchers/konks-fetcher";
import { KonksHeaderActions } from "@/modules/konks/components/actions/konks-header-actions";

export function Konks() {
  return (
    <SidebarInsetLayout headerText="Конкуренти">
      <div className="grid gap-2 p-2">
        <KonksHeaderActions />
        <KonksFetcher
          ContainerComponent={({ data }) => <KonksContainer data={data} />}
          SkeletonComponent={KonksContainerSkeleton}
        />
      </div>
    </SidebarInsetLayout>
  );
}
