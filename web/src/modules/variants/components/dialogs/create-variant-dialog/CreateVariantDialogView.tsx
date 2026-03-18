import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateVariantForm } from "@/modules/variants/components/forms/create-variant-form/CreateVariantForm";

interface CreateVariantDialogViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateVariantDialogView({
  onSuccess,
  onCancel,
}: CreateVariantDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Створити варіант</DialogTitle>
      </DialogHeader>
      <CreateVariantForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}

