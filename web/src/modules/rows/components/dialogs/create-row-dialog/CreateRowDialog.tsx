import { useState } from "react";

import { CreateRowDialogView } from "@/modules/rows/components/dialogs/create-row-dialog/CreateRowDialogView.tsx";

interface CreateRowDialogProps {
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateRowDialog({
  trigger,
  open: openProp,
  onOpenChange: onOpenChangeProp,
}: CreateRowDialogProps) {
  const [openInternal, setOpenInternal] = useState(false);

  const isControlled = openProp !== undefined && onOpenChangeProp !== undefined;
  const open = isControlled ? openProp : openInternal;
  const setOpen = isControlled ? onOpenChangeProp : setOpenInternal;

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
      trigger={isControlled ? undefined : trigger}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
