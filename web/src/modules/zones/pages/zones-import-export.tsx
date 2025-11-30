import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { ZonesExcelUploader } from "@/modules/zones/components/containers/zones-excel-container";

export function ZonesImportExport() {
  return (
    <SidebarInsetLayout headerText="Зони — Імпорт">
      <main className="grid gap-2 p-2">
        <Wrapper>
          <section className="grid gap-2">
            <ZonesExcelUploader />
          </section>
        </Wrapper>
      </main>
    </SidebarInsetLayout>
  );
}
