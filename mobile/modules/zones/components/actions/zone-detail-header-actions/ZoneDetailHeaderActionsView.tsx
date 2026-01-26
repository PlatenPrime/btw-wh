import type { ZoneDto } from "@/modules/zones/api/types/dto";
import { DeleteZoneDialog } from "@/modules/zones/components/dialogs/delete-zone-dialog/DeleteZoneDialog";
import { UpdateZoneDialog } from "@/modules/zones/components/dialogs/update-zone-dialog/UpdateZoneDialog";

interface ZoneDetailHeaderActionsViewProps {
  zone: ZoneDto;
  updateDialogOpen: boolean;
  onUpdateDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
  onDeleteSuccess: () => void;
}

export function ZoneDetailHeaderActionsView({
  zone,
  updateDialogOpen,
  onUpdateDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
  onDeleteSuccess,
}: ZoneDetailHeaderActionsViewProps) {
  return (
    <>
      <UpdateZoneDialog
        zone={zone}
        open={updateDialogOpen}
        onOpenChange={onUpdateDialogOpenChange}
      />
      <DeleteZoneDialog
        zone={zone}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
        onSuccess={onDeleteSuccess}
      />
    </>
  );
}

