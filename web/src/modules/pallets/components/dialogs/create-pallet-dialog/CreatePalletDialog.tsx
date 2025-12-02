import { Dialog } from "@/components/ui/dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { useState } from "react";
import { CreatePalletDialogTrigger } from "./CreatePalletDialogTrigger";
import { CreatePalletDialogView } from "./CreatePalletDialogView";
import { useCreatePalletDialog } from "./useCreatePalletDialog";

interface CreatePalletDialogProps {
  row: RowDto;
  showTrigger?: boolean;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreatePalletDialog({
  row,
  showTrigger = true,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: CreatePalletDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { form, isSubmitting, onSubmit, handleOpenChange: handleDialogOpenChange } =
    useCreatePalletDialog({
      row,
      onOpenChange: handleOpenChange,
      onSuccess,
    });

  const handleCancel = () => {
    handleDialogOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      {showTrigger && <CreatePalletDialogTrigger />}
      <CreatePalletDialogView
        form={form}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
