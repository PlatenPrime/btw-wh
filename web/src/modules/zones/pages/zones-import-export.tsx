import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Button } from "@/components/ui/button";
import { ZonesExcelUploader } from "@/modules/zones/components/containers/zones-excel-container";
import { handleExportZones } from "@/modules/zones/utils/handle-export-zones/handleExportZones";
import { Download, FileSpreadsheet } from "lucide-react";

export function ZonesImportExport() {
  return (
    <SidebarInsetLayout headerText="Зони — Імпорт / Експорт">
      <main className="grid gap-2 p-2">
        <Wrapper>
          <section className="grid gap-2">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Імпорт зон з Excel</h2>
            </div>
            <ZonesExcelUploader />
          </section>
        </Wrapper>

        <Wrapper>
          <section className="grid gap-2">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Експорт зон в Excel</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="default" onClick={() => handleExportZones()}>
                <Download className="mr-2 h-4 w-4" />
                Завантажити Excel
              </Button>
            </div>
          </section>
        </Wrapper>
      </main>
    </SidebarInsetLayout>
  );
}


