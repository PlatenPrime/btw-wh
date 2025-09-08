import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { RowsFetcher } from "@/modules/rows/components/fetchers";

export function Rows() {
  return (
    <SidebarInsetLayout headerText="Ряди">
      <main className="p-4">
        <RowsFetcher />
      </main>
    </SidebarInsetLayout>
  );
}
