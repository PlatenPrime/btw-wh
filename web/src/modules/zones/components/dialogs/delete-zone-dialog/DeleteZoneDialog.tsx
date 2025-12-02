import { Dialog } from "@/components/ui/dialog";
import type { ZoneDto } from "@/modules/zones/api/types";
import { useState } from "react";
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
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteZoneDialog({
    zone,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    handleOpenChange(false);
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DeleteZoneDialogView
        zone={zone}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
