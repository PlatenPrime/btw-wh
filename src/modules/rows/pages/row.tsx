import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { RowDetailContainer } from "@/modules/rows/components/row-detail/container";

export function Row() {
  return (
    <SidebarInsetLayout headerText="Ряд">
      <main className="p-4">
        <RowDetailContainer />
      </main>
    </SidebarInsetLayout>
  );
}
