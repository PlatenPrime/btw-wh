import { Dialog } from "@/components/ui/dialog";
import type { ZoneDto } from "@/modules/zones/api/types";
import { useState } from "react";
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
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useUpdateZoneDialog({
    onOpenChange: handleOpenChange,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <UpdateZoneDialogView
        zone={zone}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}



