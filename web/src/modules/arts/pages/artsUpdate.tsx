import { SidebarInsetLayout } from "@/components/shared/layout/SidebarInsetLayout";
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
