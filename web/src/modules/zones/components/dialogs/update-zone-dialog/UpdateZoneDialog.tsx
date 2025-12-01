import { Dialog } from "@/components/ui/dialog";
import type { ZoneDto } from "@/modules/zones/api/types";
import { UpdateZoneDialogView } from "./UpdateZoneDialogView";
import { useUpdateZoneDialog } from "./useUpdateZoneDialog";

interface UpdateZoneDialogProps {
  zone: ZoneDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function UpdateZoneDialog({
  zone,
  open: controlledOpen,
  onOpenChange,
}: UpdateZoneDialogProps) {
  const { handleSuccess, handleCancel } = useUpdateZoneDialog({
    onOpenChange,
  });

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <UpdateZoneDialogView
        zone={zone}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}



