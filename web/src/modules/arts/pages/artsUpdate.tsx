import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { ArtsExcelUploaderLazy } from "@/modules/arts/components/containers/arts-excel-container/ArtsExcelUploaderLazy";

export function ArtsUpdate() {
  return (
    <SidebarInsetLayout headerText="Оновлення артикулів">
      <main className="p-4">
        <ArtsExcelUploaderLazy />
      </main>
    </SidebarInsetLayout>
  );
}
