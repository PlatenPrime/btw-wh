import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import type { ZoneDto } from "@/modules/zones/api/types";
import {
  ZoneContainer,
  ZoneContainerSkeleton,
} from "@/modules/zones/components/containers/zone-container";
import { DeleteZoneDialog } from "@/modules/zones/components/dialogs/delete-zone-dialog";
import { UpdateZoneDialog } from "@/modules/zones/components/dialogs/update-zone-dialog";
import { ZoneFetcher } from "@/modules/zones/components/fetchers";
import { useState } from "react";
import { useParams } from "react-router";

export function Zone() {
  const { id } = useParams<{ id: string }>();
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

  if (!id) {
    return (
      <SidebarInsetLayout headerText="Зона не найдена">
        <main className="p-4">
          <div className="text-muted-foreground text-center">
            ID зоны не указан
          </div>
        </main>
      </SidebarInsetLayout>
    );
  }

  return (
    <SidebarInsetLayout headerText={`Зона ${id}`}>
      <main className="p-4">
        <ZoneFetcher
          zoneId={id}
          ContainerComponent={({ zone }) => (
            <ZoneContainer
              zone={zone}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
          SkeletonComponent={ZoneContainerSkeleton}
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
      </main>
    </SidebarInsetLayout>
  );
}
