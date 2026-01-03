import { useState } from "react";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { UpdateRowDialogView } from "./UpdateRowDialogView";

interface UpdateRowDialogProps {
  row: RowDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UpdateRowDialog({
  row,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: UpdateRowDialogProps) {
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
    <UpdateRowDialogView
      row={row}
      visible={open}
      onClose={handleCancel}
      onSuccess={handleSuccess}
    />
  );
}

