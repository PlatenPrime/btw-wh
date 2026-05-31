import { SidebarInsetLayout } from "@/components/layout/sidebar-inset-layout/SidebarInsetLayout";
import { SurfaceSection } from "@/components/shared/layout";
import { ZonesExcelUploader } from "@/modules/zones/components/containers/zones-excel-container";

export function ZonesImportExport() {
  return (
    <SidebarInsetLayout headerText="Зони — Імпорт">
      <main className="grid gap-2 p-2">
        <SurfaceSection>
          <section className="grid gap-2">
            <ZonesExcelUploader />
          </section>
        </SurfaceSection>
      </main>
    </SidebarInsetLayout>
  );
}
