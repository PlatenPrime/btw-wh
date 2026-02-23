import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateKonkForm } from "@/modules/konks/components/forms/create-konk-form";

interface CreateKonkDialogViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateKonkDialogView({
  onSuccess,
  onCancel,
}: CreateKonkDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Створити конкурента</DialogTitle>
      </DialogHeader>
      <CreateKonkForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
