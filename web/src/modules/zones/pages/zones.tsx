import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import { exportZones } from "@/modules/zones/api/services/queries/exportZones";
import type { ZoneDto } from "@/modules/zones/api/types";
import {
  ZonesContainer,
  ZonesContainerSkeleton,
} from "@/modules/zones/components/containers/zones-container";
import { ZonesExcelUploader } from "@/modules/zones/components/containers/zones-excel-container";
import { ZoneControls } from "@/modules/zones/components/controls/zone-controls";
import { CreateZoneDialog } from "@/modules/zones/components/dialogs/create-zone-dialog";
import { DeleteZoneDialog } from "@/modules/zones/components/dialogs/delete-zone-dialog";
import { UpdateZoneDialog } from "@/modules/zones/components/dialogs/update-zone-dialog";
import { ZonesFetcher } from "@/modules/zones/components/fetchers";
import { useZonesParams } from "@/modules/zones/hooks/useZonesParams";
import { Download, FileSpreadsheet, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

function ZonesContent() {
  const { page, limit, search, sortBy, sortOrder, setPage } = useZonesParams();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [excelDialogOpen, setExcelDialogOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<ZoneDto | null>(null);

  function handleExport() {
    exportZones()
      .then(({ blob, filename }) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
        toast.success("Файл успешно скачан");
      })
      .catch((error) => {
        toast.error("Ошибка экспорта", {
          description: error.message,
        });
      });
  }

  // Регистрация действий в header
  useRegisterHeaderActions([
    {
      id: "create-zone",
      label: "Створити зону",
      icon: Plus,
      iconColor: "emerald",
      variant: "default",
      onClick: () => setCreateDialogOpen(true),
    },
    {
      id: "import-excel",
      label: "Імпорт Excel",
      icon: FileSpreadsheet,
      iconColor: "default",
      variant: "default",
      onClick: () => setExcelDialogOpen(true),
    },
    {
      id: "export-excel",
      label: "Експорт Excel",
      icon: Download,
      iconColor: "default",
      variant: "default",
      onClick: handleExport,
    },
  ]);

  const handleEdit = (zone: ZoneDto) => {
    setSelectedZone(zone);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (zone: ZoneDto) => {
    setSelectedZone(zone);
    setDeleteDialogOpen(true);
  };

  return (
    <main className="grid gap-2 p-2">
      <ZoneControls />

      <ZonesFetcher
        params={{ page, limit, search, sortBy, sortOrder }}
        ContainerComponent={({ data }) => (
          <ZonesContainer
            data={data}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onPageChange={setPage}
          />
        )}
        SkeletonComponent={ZonesContainerSkeleton}
      />

      {/* Диалоги */}
      <CreateZoneDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />

      {selectedZone && (
        <UpdateZoneDialog
          zone={selectedZone}
          open={updateDialogOpen}
          onOpenChange={setUpdateDialogOpen}
        />
      )}

      {selectedZone && (
        <DeleteZoneDialog
          zone={selectedZone}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}

      {/* Excel диалог */}
      {excelDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-background m-4 max-h-[90vh] max-w-4xl overflow-y-auto rounded-lg shadow-lg">
            <div className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Імпорт зон з Excel</h2>
                <button
                  onClick={() => setExcelDialogOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              </div>
              <ZonesExcelUploader />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export function Zones() {
  return (
    <SidebarInsetLayout headerText="Зони">
      <ZonesContent />
    </SidebarInsetLayout>
  );
}
