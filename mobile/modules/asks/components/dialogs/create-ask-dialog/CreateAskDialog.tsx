import { useState } from "react";
import { CreateAskDialogView } from "./CreateAskDialogView";

interface CreateAskDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
  preFilledArtikul?: string;
}

export function CreateAskDialog({
  open: controlledOpen,
  onOpenChange,
  onSuccess,
  preFilledArtikul,
}: CreateAskDialogProps) {
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
    <CreateAskDialogView
      visible={open}
      onClose={handleCancel}
      onSuccess={handleSuccess}
      preFilledArtikul={preFilledArtikul}
    />
  );
}

