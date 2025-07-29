import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { RowDetailContainer } from "@/modules/rows/components/containers/row-detail/container";
import { useParams } from "react-router";

export function Row() {
  const { row } = useParams<{ row: string }>();
  return (
    <SidebarInsetLayout headerText={`Ряд: ${row || "невідомий"}`}>
      <main className="p-4">
        <RowDetailContainer />
      </main>
    </SidebarInsetLayout>
  );
}
