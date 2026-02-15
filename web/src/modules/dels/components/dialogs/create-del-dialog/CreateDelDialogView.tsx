import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateDelForm } from "@/modules/dels/components/forms/create-del-form";

interface CreateDelDialogViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateDelDialogView({
  onSuccess,
  onCancel,
}: CreateDelDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Створити поставку</DialogTitle>
      </DialogHeader>
      <CreateDelForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
