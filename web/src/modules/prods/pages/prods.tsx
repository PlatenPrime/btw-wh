import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import {
  ProdsContainer,
  ProdsContainerSkeleton,
} from "@/modules/prods/components/containers/prods-container";
import { ProdsFetcher } from "@/modules/prods/components/fetchers/prods-fetcher";
import { ProdsHeaderActions } from "@/modules/prods/components/actions/prods-header-actions";

export function Prods() {
  return (
    <SidebarInsetLayout headerText="Виробники">
      <div className="grid gap-2 p-2">
        <ProdsHeaderActions />
        <ProdsFetcher
          ContainerComponent={({ data }) => <ProdsContainer data={data} />}
          SkeletonComponent={ProdsContainerSkeleton}
        />
      </div>
    </SidebarInsetLayout>
  );
}
