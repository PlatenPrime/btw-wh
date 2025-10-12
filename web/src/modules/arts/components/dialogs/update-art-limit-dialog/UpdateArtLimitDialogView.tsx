import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { UpdateArtLimitForm } from "@/modules/arts/components/forms/update-art-limit-form/UpdateArtLimitForm";

interface UpdateArtLimitDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  artData: ArtDto;
  onSuccess: () => void;
  onCancel: () => void;
}

export function UpdateArtLimitDialogView({
  open,
  setOpen,
  artData,
  onSuccess,
  onCancel,
}: UpdateArtLimitDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            Артикул: {artData.artikul}
          </DialogTitle>
        </DialogHeader>
        <UpdateArtLimitForm
          artData={artData}
          onSuccess={onSuccess}
          onCancel={onCancel}
        />
      </DialogContent>
    </Dialog>
  );
}
