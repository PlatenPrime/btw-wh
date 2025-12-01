import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CompleteAskDialogViewProps {
  artikul: string;
  isCompleting: boolean;
  onComplete: () => Promise<void>;
  onCancel: () => void;
}

export function CompleteAskDialogView({
  artikul,
  isCompleting,
  onComplete,
  onCancel,
}: CompleteAskDialogViewProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Виконати запит "{artikul}"?</DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете виконати запит "{artikul}"? Ця дія змінить
          статус запиту на "виконано".
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onComplete}
          cancelText="Скасувати"
          submitText="Виконати"
          isSubmitting={isCompleting}
          className="w-full"
        />
      </DialogFooter>
    </DialogContent>
  );
}
