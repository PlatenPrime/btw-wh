import { Dialog } from "@/components/ui/dialog";
import { useState } from "react";
import { CreateAskDialogTrigger } from "./CreateAskDialogTrigger";
import { CreateAskDialogView } from "./CreateAskDialogView";
import { useCreateAskDialog } from "./useCreateAskDialog";

interface CreateAskDialogProps {
  onSuccess?: () => void;
  preFilledArtikul?: string;
  trigger?: React.ReactNode;
  showTrigger?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateAskDialog({
  onSuccess,
  preFilledArtikul,
  trigger,
  showTrigger = true,
  open: controlledOpen,
  onOpenChange,
}: CreateAskDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useCreateAskDialog({
    onOpenChange: handleOpenChange,
    onSuccess,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {showTrigger && <CreateAskDialogTrigger trigger={trigger} />}
      <CreateAskDialogView
        onSuccess={handleSuccess}
        onCancel={handleCancel}
        preFilledArtikul={preFilledArtikul}
      />
    </Dialog>
  );
}
