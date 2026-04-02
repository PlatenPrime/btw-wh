import { Dialog } from "@/components/ui/dialog";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { useState } from "react";
import { UpdateArtDialogView } from "./UpdateArtDialogView";
import { useUpdateArtDialog } from "./useUpdateArtDialog";

interface UpdateArtDialogProps {
  artData: ArtDto;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function UpdateArtDialog({
  artData,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: UpdateArtDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { handleSuccess, handleCancel } = useUpdateArtDialog({
    onOpenChange: handleOpenChange,
    onSuccess,
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <UpdateArtDialogView
        artData={artData}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
