import { useState } from "react";

import { CreateRowDialogView } from "./CreateRowDialogView";

interface CreateRowDialogProps {
  trigger?: React.ReactNode;

}

export function CreateRowDialog({ trigger}: CreateRowDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    setOpen(false);

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
