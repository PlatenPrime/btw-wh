import { useState } from "react";

import { CreateRowDialogView } from "./view";

interface CreateRowDialogProps {
  trigger?: React.ReactNode;
  onSuccess: () => void;
}

export function CreateRowDialog({ trigger, onSuccess }: CreateRowDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);
    onSuccess();
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <CreateRowDialogView
      open={open}
      setOpen={setOpen}
      trigger={trigger}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
