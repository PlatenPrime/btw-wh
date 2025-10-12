import type { ArtDto } from "@/modules/arts/api/types/dto";
import { UpdateArtLimitDialogView } from "./UpdateArtLimitDialogView";

interface UpdateArtLimitDialogProps {
  artData: ArtDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdateArtLimitDialog({
  artData,
  open,
  onOpenChange,
}: UpdateArtLimitDialogProps) {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <UpdateArtLimitDialogView
      open={open}
      setOpen={onOpenChange}
      artData={artData}
      onSuccess={handleSuccess}
      onCancel={handleCancel}
    />
  );
}
