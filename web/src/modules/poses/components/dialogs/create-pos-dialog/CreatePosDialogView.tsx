import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { IPallet } from "@/modules/pallets/api/types";
import { CreatePosForm } from "@/modules/poses/components/forms/create-pos-form/CreatePosForm";

interface CreatePosDialogViewProps {
  pallet: IPallet;
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreatePosDialogView({
  pallet,
  onSuccess,
  onCancel,
}: CreatePosDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center">Створити нову позицію</DialogTitle>
      </DialogHeader>
      <CreatePosForm pallet={pallet} onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
