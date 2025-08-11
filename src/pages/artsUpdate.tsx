import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { ArtsExcelUploader } from "@/modules/arts/components/containers/arts-excel-uploader/ArtsExcelUploader";

export function ArtsUpdate() {
  return (
    <SidebarInsetLayout headerText="Оновлення артикулів">
      <main className=" p-4">
        <ArtsExcelUploader />
      </main>
    </SidebarInsetLayout>
  );
}
