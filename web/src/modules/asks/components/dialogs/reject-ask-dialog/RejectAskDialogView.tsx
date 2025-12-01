import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RejectAskDialogViewProps {
  artikul: string;
  isRejecting: boolean;
  onReject: () => Promise<void>;
  onCancel: () => void;
}

export function RejectAskDialogView({
  artikul,
  isRejecting,
  onReject,
  onCancel,
}: RejectAskDialogViewProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Відмовити на запит "{artikul}"?</DialogTitle>
        <DialogDescription>
          Ви впевнені, що хочете відмовити на запит "{artikul}"? Ця дія змінить
          статус запиту на "відмовлено".
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onReject}
          cancelText="Скасувати"
          submitText="Відмовити"
          isSubmitting={isRejecting}
          variant="destructive"
          className="w-full"
        />
      </DialogFooter>
    </DialogContent>
  );
}
