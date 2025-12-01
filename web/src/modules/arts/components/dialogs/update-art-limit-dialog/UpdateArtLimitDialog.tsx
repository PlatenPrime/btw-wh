import { Dialog } from "@/components/ui/dialog";
import type { ArtDto } from "@/modules/arts/api/types/dto";
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
  const { handleSuccess, handleCancel } = useUpdateArtLimitDialog({
    onOpenChange,
    onSuccess,
  });

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <UpdateArtLimitDialogView
        artData={artData}
        onSuccess={handleSuccess}
        onCancel={handleCancel}
      />
    </Dialog>
  );
}
