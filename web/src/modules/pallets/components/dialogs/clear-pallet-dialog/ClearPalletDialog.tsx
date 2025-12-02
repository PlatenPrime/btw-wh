import { Dialog } from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { useState } from "react";
import { ClearPalletDialogTrigger } from "./ClearPalletDialogTrigger";
import { ClearPalletDialogView } from "./ClearPalletDialogView";
import { useClearPalletDialog } from "./useClearPalletDialog";

interface ClearPalletDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function ClearPalletDialog({
  pallet,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: ClearPalletDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange: (open: boolean) => void =
    isControlled && onOpenChange ? onOpenChange : setInternalOpen;

  const { isClearing, handleClear } = useClearPalletDialog({
    pallet,
    onSuccess,
  });

  const handleClearAndClose = async () => {
    await handleClear();
    handleOpenChange(false);
  };

  const handleCancel = () => {
    handleOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger !== undefined && <ClearPalletDialogTrigger trigger={trigger} />}
      <ClearPalletDialogView
        pallet={pallet}
        isClearing={isClearing}
        onClear={handleClearAndClose}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
