import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { LazyArtsExcelUploader } from "@/modules/arts/components/containers/arts-excel-uploader/LazyArtsExcelUploader";

export function ArtsUpdate() {
  return (
    <SidebarInsetLayout headerText="Оновлення артикулів">
      <main className="p-4">
        <LazyArtsExcelUploader />
      </main>
    </SidebarInsetLayout>
  );
}
