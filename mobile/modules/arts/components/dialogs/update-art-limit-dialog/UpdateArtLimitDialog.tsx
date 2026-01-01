import { useState } from "react";
import { useThemeColors } from "@/hooks/use-theme-colors";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { UpdateArtLimitDialogView } from "./UpdateArtLimitDialogView";

interface UpdateArtLimitDialogProps {
  artData: ArtDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UpdateArtLimitDialog({
  artData,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: UpdateArtLimitDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const { dialog, text } = useThemeColors();
  const bgColor = dialog.bg;
  const textColor = text.primary;
  const borderColor = dialog.border;

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const handleSuccess = () => {
    handleOpenChange?.(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  return (
    <UpdateArtLimitDialogView
      artData={artData}
      visible={open}
      onClose={handleCancel}
      onSuccess={handleSuccess}
      bgColor={bgColor}
      textColor={textColor}
      borderColor={borderColor}
    />
  );
}

