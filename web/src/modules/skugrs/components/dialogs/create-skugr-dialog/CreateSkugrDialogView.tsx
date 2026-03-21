import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateSkugrForm } from "@/modules/skugrs/components/forms/create-skugr-form/CreateSkugrForm";

interface CreateSkugrDialogViewProps {
  onSuccess: (id: string) => void;
  onCancel: () => void;
}

export function CreateSkugrDialogView({
  onSuccess,
  onCancel,
}: CreateSkugrDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Створити товарну групу</DialogTitle>
      </DialogHeader>
      <CreateSkugrForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
