import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IPos } from "@/modules/poses/api/types";
import { UpdatePosForm } from "@/modules/poses/components/forms/update-pos-form/UpdatePosForm.tsx";

interface UpdatePosDialogViewProps {
  pos: IPos;
  onSuccess: () => void;
  onCancel: () => void;
  isDialogOpen: boolean;
}

export function UpdatePosDialogView({
  pos,
  onSuccess,
  onCancel,
  isDialogOpen,
}: UpdatePosDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center">{pos.artikul}</DialogTitle>
      </DialogHeader>
      <UpdatePosForm
        pos={pos}
        onSuccess={onSuccess}
        onCancel={onCancel}
        isDialogOpen={isDialogOpen}
      />
    </DialogContent>
  );
}
