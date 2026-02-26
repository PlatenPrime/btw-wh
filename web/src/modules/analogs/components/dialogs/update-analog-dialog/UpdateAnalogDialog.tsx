import { Dialog } from "@/components/ui/dialog";
import type { AnalogDto } from "@/modules/analogs/api/types";
import { useState } from "react";
import { UpdateAnalogDialogView } from "./UpdateAnalogDialogView";
import { useUpdateAnalogDialog } from "./useUpdateAnalogDialog";

interface UpdateAnalogDialogProps {
  analog: AnalogDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UpdateAnalogDialog({
  analog,
  open: controlledOpen,
  onOpenChange,
}: UpdateAnalogDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useUpdateAnalogDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <UpdateAnalogDialogView
        analog={analog}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
