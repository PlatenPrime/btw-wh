import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResetPalletsSectorsConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function ResetPalletsSectorsConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  isPending,
}: ResetPalletsSectorsConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Скинути сектора</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете скинути сектори всіх палет і прибрати
            зв&apos;язок з групами? Дію не можна скасувати.
          </DialogDescription>
        </DialogHeader>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onConfirm}
          submitText="Скинути сектора"
          isSubmitting={isPending}
          variant="destructive"
        />
      </DialogContent>
    </Dialog>
  );
}
