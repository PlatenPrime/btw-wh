import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { UpdateArtForm } from "@/modules/arts/components/forms/update-art-form/UpdateArtForm";

interface UpdateArtDialogViewProps {
  artData: ArtDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateArtDialogView({
  artData,
  onSuccess,
  onCancel,
}: UpdateArtDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center">
          Редагування: {artData.artikul}
        </DialogTitle>
      </DialogHeader>
      <UpdateArtForm
        artData={artData}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    </DialogContent>
  );
}
