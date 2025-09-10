import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { RowFetcher } from "@/modules/rows/components/fetchers";
import { RowContainer, RowContainerSkeleton } from "@/modules/rows/components/containers/row-container";
import { useParams } from "react-router";

export function Row() {
  const { row } = useParams<{ row: string }>();
  return (
    <SidebarInsetLayout headerText={`Ряд: ${row || "невідомий"}`}>
      <main className="p-4">
        <RowFetcher
          rowTitle={row}
          ContainerComponent={RowContainer}
          SkeletonComponent={RowContainerSkeleton}
        />
      </main>
    </SidebarInsetLayout>
  );
}
