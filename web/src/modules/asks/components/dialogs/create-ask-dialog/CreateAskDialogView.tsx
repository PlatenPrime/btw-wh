import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateAskForm } from "@/modules/asks/components/forms/create-ask-form/CreateAskForm";

interface CreateAskDialogViewProps {
  onSuccess: () => void;
  onCancel: () => void;
  preFilledArtikul?: string;
}

export function CreateAskDialogView({
  onSuccess,
  onCancel,
  preFilledArtikul,
}: CreateAskDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="text-center">Створити новий запит</DialogTitle>
      </DialogHeader>
      <CreateAskForm
        onSuccess={onSuccess}
        onCancel={onCancel}
        preFilledArtikul={preFilledArtikul}
      />
    </DialogContent>
  );
}
