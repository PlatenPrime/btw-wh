import { Dialog } from "@/components/ui/dialog";
import type { RowDto } from "@/modules/rows/api/types/dto";
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
  const { handleSuccess, handleCancel } = useUpdateRowDialog({
    onOpenChange,
    onSuccess,
  });

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      {trigger && <UpdateRowDialogTrigger trigger={trigger} />}
      <UpdateRowDialogView
        row={row}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
