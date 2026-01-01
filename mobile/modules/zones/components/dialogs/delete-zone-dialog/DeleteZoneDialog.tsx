import { useState } from "react";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { ZoneDto } from "@/modules/zones/api/types/dto";
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
  const { dialog, text } = useThemeColors();
  const bgColor = dialog.bg;
  const textColor = text.primary;
  const borderColor = dialog.border;

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeleteZoneDialog({
    zone,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    handleOpenChange?.(false);
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <DeleteZoneDialogView
      zone={zone}
      visible={open}
      onClose={handleCancel}
      onDelete={handleDeleteAndClose}
      isDeleting={isDeleting}
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
    />
  );
}

