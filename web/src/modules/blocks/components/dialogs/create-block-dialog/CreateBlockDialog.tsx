import { Dialog } from "@/components/ui/dialog";
import { CreateBlockDialogView } from "./CreateBlockDialogView";
import { useCreateBlockDialog } from "./useCreateBlockDialog";

interface CreateBlockDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateBlockDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateBlockDialogProps) {
  const { handleSuccess, handleCancel } = useCreateBlockDialog({
    onOpenChange,
  });

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <CreateBlockDialogView onSuccess={handleSuccess} onCancel={handleCancel} />
    </Dialog>
  );
}

