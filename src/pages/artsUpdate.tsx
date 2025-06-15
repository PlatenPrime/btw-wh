import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout";
import { ExcelUploader } from "@/modules/arts/components/arts-excel-uploader";

export function ArtsUpdate() {
  return (
    <SidebarInsetLayout headerText="Оновлення артикулів">
      <main className=" p-4">
        <ExcelUploader />
      </main>
    </SidebarInsetLayout>
  );
}
