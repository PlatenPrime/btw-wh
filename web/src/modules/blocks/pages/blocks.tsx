import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  BlocksContainer,
  BlocksContainerSkeleton,
} from "@/modules/blocks/components/containers/blocks-container";
import { BlocksFetcher } from "@/modules/blocks/components/fetchers/blocks-fetcher/BlocksFetcher";

export function BlocksPage() {
  return (
    <SidebarInsetLayout headerText="Блоки">
      <BlocksFetcher
        ContainerComponent={BlocksContainer}
        SkeletonComponent={BlocksContainerSkeleton}
      />
    </SidebarInsetLayout>
  );
}
