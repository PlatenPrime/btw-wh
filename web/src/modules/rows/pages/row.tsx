import { SidebarInsetLayout } from "@/components/shared/sidebar/sidebar-inset-layout";
import {
  RowContainer,
  RowContainerSkeleton,
} from "@/modules/rows/components/containers/row-container";
import { RowFetcher } from "@/modules/rows/components/fetchers";
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
