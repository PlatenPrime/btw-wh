import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateProdForm } from "@/modules/prods/components/forms/create-prod-form";

interface CreateProdDialogViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateProdDialogView({
  onSuccess,
  onCancel,
}: CreateProdDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[500px]">
      <DialogHeader>
        <DialogTitle>Створити виробника</DialogTitle>
      </DialogHeader>
      <CreateProdForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
