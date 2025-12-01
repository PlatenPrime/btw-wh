import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateBlockForm } from "@/modules/blocks/components/forms/create-block-form";

interface CreateBlockDialogViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateBlockDialogView({
  onSuccess,
  onCancel,
}: CreateBlockDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Створити блок</DialogTitle>
      </DialogHeader>
      <CreateBlockForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}

