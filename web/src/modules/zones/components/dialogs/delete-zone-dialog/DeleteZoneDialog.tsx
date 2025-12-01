import { Dialog } from "@/components/ui/dialog";
import type { ZoneDto } from "@/modules/zones/api/types";
import { DeleteZoneDialogView } from "./DeleteZoneDialogView";
import { useDeleteZoneDialog } from "./useDeleteZoneDialog";

interface DeleteZoneDialogProps {
  zone: ZoneDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeleteZoneDialog({
  zone,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeleteZoneDialogProps) {
  const { isDeleting, handleDelete } = useDeleteZoneDialog({
    zone,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    onOpenChange?.(false);
  };

  const handleCancel = () => {
    onOpenChange?.(false);
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DeleteZoneDialogView
        zone={zone}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
