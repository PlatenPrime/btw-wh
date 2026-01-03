import { FormDialog } from "@/components/shared/form-dialog";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { UpdateArtLimitForm } from "@/modules/arts/components/forms/update-art-limit-form/UpdateArtLimitForm";

interface UpdateArtLimitDialogViewProps {
  artData: ArtDto;
  visible: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function UpdateArtLimitDialogView({
  artData,
  visible,
  onClose,
  onSuccess,
}: UpdateArtLimitDialogViewProps) {
  return (
    <FormDialog
      visible={visible}
      onClose={onClose}
      title={`Артикул: ${artData.artikul}`}
    >
      <UpdateArtLimitForm
        artData={artData}
        onSuccess={onSuccess}
        onCancel={onClose}
      />
    </FormDialog>
  );
}

