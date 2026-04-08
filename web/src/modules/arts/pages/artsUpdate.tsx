import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { ArtsUpdateHeaderActions } from "@/modules/arts/components/actions/arts-update-header-actions/ArtsUpdateHeaderActions";
import { ArtsExcelUploaderLazy } from "@/modules/arts/components/containers/arts-excel-container/ArtsExcelUploaderLazy";

export function ArtsUpdate() {
  return (
    <SidebarInsetLayout headerText="Оновлення артикулів">
      <ArtsUpdateHeaderActions />
      <main className="p-4">
        <ArtsExcelUploaderLazy />
      </main>
    </SidebarInsetLayout>
  );
}
