import { useState } from "react";
import { CreateAskDialogView } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialogView.tsx";

interface CreateAskDialogProps {
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function CreateAskDialog({ trigger, onSuccess }: CreateAskDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess?.();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <CreateAskDialogView
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
