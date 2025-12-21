import type { RowDto } from "@/modules/rows/api/types/dto";
import { useState } from "react";
import { CreatePalletDialogView } from "./CreatePalletDialogView";
import { useCreatePalletDialog } from "./useCreatePalletDialog";

interface CreatePalletDialogProps {
  row: RowDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function CreatePalletDialog({
  row,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: CreatePalletDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const {
    form,
    isSubmitting,
    onSubmit,
    handleOpenChange: handleDialogOpenChange,
  } = useCreatePalletDialog({
    row,
    onOpenChange: handleOpenChange,
    onSuccess,
  });

  const handleClose = () => {
    handleDialogOpenChange(false);
  };

  return (
    <CreatePalletDialogView
      visible={open}
      onClose={handleClose}
      form={form}
      onSubmit={onSubmit}
      isSubmitting={isSubmitting}
    />
  );
}
