import { Dialog } from "@/components/ui/dialog";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useState } from "react";
import { UpdateArtLimitDialogView } from "./UpdateArtLimitDialogView";
import { useUpdateArtLimitDialog } from "./useUpdateArtLimitDialog";

interface UpdateArtLimitDialogProps {
  artData: ArtDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UpdateArtLimitDialog({
  artData,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: UpdateArtLimitDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useUpdateArtLimitDialog({
    onOpenChange: handleOpenChange,
    onSuccess,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <UpdateArtLimitDialogView
        artData={artData}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
