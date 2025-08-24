import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { useParams } from "react-router";
import { RowDetail } from "@/modules/rows/components/containers/row-detail/RowDetail";

export function Row() {
  const { row } = useParams<{ row: string }>();
  return (
    <SidebarInsetLayout headerText={`Ряд: ${row || "невідомий"}`}>
      <main className="p-4">
        <RowDetail rowTitle={row} />
      </main>
    </SidebarInsetLayout>
  );
}
