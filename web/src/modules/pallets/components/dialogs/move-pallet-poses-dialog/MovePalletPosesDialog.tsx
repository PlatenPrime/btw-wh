import { Dialog } from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { useState } from "react";
import { MovePalletPosesDialogTrigger } from "./MovePalletPosesDialogTrigger";
import { MovePalletPosesDialogView } from "./MovePalletPosesDialogView";
import { useMovePalletPosesDialog } from "./useMovePalletPosesDialog";

interface MovePalletPosesDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function MovePalletPosesDialog({
  pallet,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: MovePalletPosesDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const {
    isMoving,
    isSourceEmpty,
    mutationError,
    handleSubmit,
    handleOpenChange: handleDialogOpenChange,
  } = useMovePalletPosesDialog({
    pallet,
    onOpenChange: handleOpenChange,
    onSuccess,
  });

  const handleCancel = () => {
    handleDialogOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      {trigger !== undefined && (
        <MovePalletPosesDialogTrigger trigger={trigger} />
      )}
      <MovePalletPosesDialogView
        pallet={pallet}
        isSourceEmpty={isSourceEmpty}
        mutationError={mutationError}
        isMoving={isMoving}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
