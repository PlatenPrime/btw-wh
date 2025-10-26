import type { ZoneDto } from "@/modules/zones/api/types";
import { ZoneDetailsCard } from "@/modules/zones/components/cards/zone-details-card";
import { DeleteZoneDialog } from "@/modules/zones/components/dialogs/delete-zone-dialog";
import { UpdateZoneDialog } from "@/modules/zones/components/dialogs/update-zone-dialog";

interface ZoneContainerViewProps {
  zone: ZoneDto;
  updateDialogOpen: boolean;
  setUpdateDialogOpen: (open: boolean) => void;
  deleteDialogOpen: boolean;
  setDeleteDialogOpen: (open: boolean) => void;
  onDeleteSuccess?: () => void;
}

export function ZoneContainerView({
  zone,
  updateDialogOpen,
  setUpdateDialogOpen,
  deleteDialogOpen,
  setDeleteDialogOpen,
  onDeleteSuccess,
}: ZoneContainerViewProps) {
  return (
    <div className="grid gap-2">
      <ZoneDetailsCard zone={zone} />

      {/* Диалоги вне dropdown для избежания конфликта фокуса */}
      <UpdateZoneDialog
        zone={zone}
        open={updateDialogOpen}
        onOpenChange={setUpdateDialogOpen}
      />

      <DeleteZoneDialog
        zone={zone}
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onSuccess={onDeleteSuccess}
      />
    </div>
  );
}
