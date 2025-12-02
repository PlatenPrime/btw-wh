import { Dialog } from "@/components/ui/dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { useState } from "react";
import { UpdateRowDialogTrigger } from "./UpdateRowDialogTrigger";
import { UpdateRowDialogView } from "./UpdateRowDialogView";
import { useUpdateRowDialog } from "./useUpdateRowDialog";

interface UpdateRowDialogProps {
  row: RowDto;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UpdateRowDialog({
  row,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: UpdateRowDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useUpdateRowDialog({
    onOpenChange: handleOpenChange,
    onSuccess,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger && <UpdateRowDialogTrigger trigger={trigger} />}
      <UpdateRowDialogView
        row={row}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
