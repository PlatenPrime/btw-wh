import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import {
  DelsContainer,
  DelsContainerSkeleton,
} from "@/modules/dels/components/containers/dels-container";
import { DelsFetcher } from "@/modules/dels/components/fetchers/dels-fetcher";
import { DelsHeaderActions } from "@/modules/dels/components/actions/dels-header-actions";
import { DelsExcelSheetLink } from "@/modules/dels/components/elements/dels-excel-sheet-link";

export function Dels() {
  return (
    <SidebarInsetLayout headerText="Поставки">
      <div className="grid gap-2 p-2">
        <DelsHeaderActions />
        <DelsExcelSheetLink />
        <DelsFetcher
          ContainerComponent={({ data }) => <DelsContainer data={data} />}
          SkeletonComponent={DelsContainerSkeleton}
        />
      </div>
    </SidebarInsetLayout>
  );
}
