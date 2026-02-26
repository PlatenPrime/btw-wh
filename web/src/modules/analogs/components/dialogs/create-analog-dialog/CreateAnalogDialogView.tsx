import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreateAnalogForm } from "@/modules/analogs/components/forms/create-analog-form/CreateAnalogForm";

interface CreateAnalogDialogViewProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function CreateAnalogDialogView({
  onSuccess,
  onCancel,
}: CreateAnalogDialogViewProps) {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Створити аналог</DialogTitle>
      </DialogHeader>
      <CreateAnalogForm onSuccess={onSuccess} onCancel={onCancel} />
    </DialogContent>
  );
}
