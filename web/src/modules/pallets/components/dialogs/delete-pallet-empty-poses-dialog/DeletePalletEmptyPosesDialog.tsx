import { Dialog } from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { useState } from "react";
import { DeletePalletEmptyPosesDialogTrigger } from "./DeletePalletEmptyPosesDialogTrigger";
import { DeletePalletEmptyPosesDialogView } from "./DeletePalletEmptyPosesDialogView";
import { useDeletePalletEmptyPosesDialog } from "./useDeletePalletEmptyPosesDialog";

interface DeletePalletEmptyPosesDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeletePalletEmptyPosesDialog({
  pallet,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: DeletePalletEmptyPosesDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeletePalletEmptyPosesDialog({
    pallet,
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
      {trigger !== undefined && (
        <DeletePalletEmptyPosesDialogTrigger trigger={trigger} />
      )}
      <DeletePalletEmptyPosesDialogView
        pallet={pallet}
        isDeleting={isDeleting}
        onDelete={handleDeleteAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
