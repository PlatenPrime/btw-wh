import { Dialog } from "@/components/ui/dialog";
import { CreateZoneDialogView } from "./CreateZoneDialogView";
import { useCreateZoneDialog } from "./useCreateZoneDialog";

interface CreateZoneDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CreateZoneDialog({
  open: controlledOpen,
  onOpenChange,
}: CreateZoneDialogProps) {
  const { handleSuccess, handleCancel } = useCreateZoneDialog({
    onOpenChange,
  });

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <CreateZoneDialogView onSuccess={handleSuccess} onCancel={handleCancel} />
    </Dialog>
  );
}



