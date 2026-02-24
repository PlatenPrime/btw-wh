import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateConstantForm } from "@/modules/constants/components/forms/create-constant-form";

interface CreateConstantDialogViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateConstantDialogView({
  onSuccess,
  onCancel,
}: CreateConstantDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Створити константу</DialogTitle>
      </DialogHeader>
      <CreateConstantForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
