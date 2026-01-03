import { useState } from "react";
import type { ZoneDto } from "@/modules/zones/api/types/dto";
import { UpdateZoneDialogView } from "./UpdateZoneDialogView";

interface UpdateZoneDialogProps {
  zone: ZoneDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UpdateZoneDialog({
  zone,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: UpdateZoneDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

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
    <UpdateZoneDialogView
      zone={zone}
      visible={open}
      onClose={handleCancel}
      onSuccess={handleSuccess}
    />
  );
}

