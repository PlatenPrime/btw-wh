import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  ConstantsContainer,
  ConstantsContainerSkeleton,
} from "@/modules/constants/components/containers/constants-container";
import { ConstantsFetcher } from "@/modules/constants/components/fetchers/constants-fetcher";
import { ConstantsHeaderActions } from "@/modules/constants/components/actions/constants-header-actions";

export function Constants() {
  return (
    <SidebarInsetLayout headerText="Константи">
      <div className="grid gap-2 p-2">
        <ConstantsHeaderActions />
        <ConstantsFetcher
          ContainerComponent={({ data }) => <ConstantsContainer data={data} />}
          SkeletonComponent={ConstantsContainerSkeleton}
        />
      </div>
    </SidebarInsetLayout>
  );
}
