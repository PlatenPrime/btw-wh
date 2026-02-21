import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface UpdateAllDelArtikulsConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function UpdateAllDelArtikulsConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  isPending,
}: UpdateAllDelArtikulsConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Оновити всі артикули</DialogTitle>
          <DialogDescription>
            Буде виконано оновлення даних по всіх артикулах цієї поставки. Це
            може зайняти деякий час.
          </DialogDescription>
        </DialogHeader>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onConfirm}
          submitText="Оновити всі"
          isSubmitting={isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
