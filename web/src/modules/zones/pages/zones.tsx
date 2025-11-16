import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { ZoneDto } from "@/modules/zones/api/types";
import {
  ZonesContainer,
  ZonesContainerSkeleton,
} from "@/modules/zones/components/containers/zones-container";
import { ZonesControls } from "@/modules/zones/components/controls/zones-controls/ZonesControls";
import { CreateZoneDialog } from "@/modules/zones/components/dialogs/create-zone-dialog";
import { DeleteZoneDialog } from "@/modules/zones/components/dialogs/delete-zone-dialog";
import { UpdateZoneDialog } from "@/modules/zones/components/dialogs/update-zone-dialog";
import { ZonesFetcher } from "@/modules/zones/components/fetchers";
import { useZonesParams } from "@/modules/zones/hooks/useZonesParams";
import { Plus } from "lucide-react";
import { useState } from "react";

// Регистрирует экшены хедера под провайдером из SidebarInsetLayout
function ZonesHeaderActions({ onCreate }: { onCreate: () => void }) {
  useRegisterHeaderActions([
    {
      id: "create-zone",
      label: "Створити зону",
      icon: Plus,
      iconColor: "emerald",
      variant: "default",
      onClick: onCreate,
    },
  ]);

  return null;
}

export function Zones() {
  const { page, limit, search, sortBy, sortOrder, setPage } = useZonesParams();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedZone, setSelectedZone] = useState<ZoneDto | null>(null);

  const handleEdit = (zone: ZoneDto) => {
    setSelectedZone(zone);
    setUpdateDialogOpen(true);
  };

  const handleDelete = (zone: ZoneDto) => {
    setSelectedZone(zone);
    setDeleteDialogOpen(true);
  };

  return (
    <SidebarInsetLayout headerText="Зони">
      <div className="grid gap-2 p-2">
      <ZonesHeaderActions onCreate={() => setCreateDialogOpen(true)} />
      <ZonesControls />

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
      </div>
    </SidebarInsetLayout>
  );
}
