import { useState } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
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
  const colorScheme = useColorScheme() ?? "light";
  const bgColor = colorScheme === "light" ? "#fff" : "#1f2937";
  const textColor = colorScheme === "light" ? Colors.light.text : Colors.dark.text;
  const borderColor = colorScheme === "light" ? "#d1d5db" : "#4b5563";

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

