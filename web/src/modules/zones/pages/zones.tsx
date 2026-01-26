import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import type { ZoneDto } from "@/modules/zones/api/types";
import { ZonesHeaderActions } from "@/modules/zones/components/actions/zones-header-actions";
import {
  ZonesContainer,
  ZonesContainerSkeleton,
} from "@/modules/zones/components/containers/zones-container";
import { ZonesControls } from "@/modules/zones/components/controls/zones-controls/ZonesControls";
import { DeleteZoneDialog } from "@/modules/zones/components/dialogs/delete-zone-dialog";
import { UpdateZoneDialog } from "@/modules/zones/components/dialogs/update-zone-dialog";
import { ZonesFetcher } from "@/modules/zones/components/fetchers/zones-fetcher";
import { useZonesParams } from "@/modules/zones/hooks/useZonesParams";
import { useState } from "react";

export function Zones() {
  const { page, limit, search, sortBy, sortOrder, setPage } = useZonesParams();
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
        <ZonesHeaderActions />
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
