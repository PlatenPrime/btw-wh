import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RunChainDelConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function RunChainDelConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  isPending,
}: RunChainDelConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  const handleCancel = () => {
    onCancel();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Ланцюгове оновлення</DialogTitle>
          <DialogDescription>
            Артикули поставки будуть оновлюватися по черзі, один за одним. Процес
            відображатиметься в списку артикулів.
          </DialogDescription>
        </DialogHeader>
        <DialogActions
          onCancel={handleCancel}
          onSubmit={handleConfirm}
          submitText="Запустити"
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
