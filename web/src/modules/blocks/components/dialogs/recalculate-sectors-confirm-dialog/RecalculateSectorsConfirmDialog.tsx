import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RecalculateSectorsConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

export function RecalculateSectorsConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  isPending,
}: RecalculateSectorsConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={!isPending}>
        <DialogHeader>
          <DialogTitle>Перерахувати сектора</DialogTitle>
          <DialogDescription>
            Буде виконано перерахунок секторів зон у всіх блоках. Продовжити?
          </DialogDescription>
        </DialogHeader>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onConfirm}
          submitText="Перерахувати"
          isSubmitting={isPending}
          variant="default"
        />
      </DialogContent>
    </Dialog>
  );
}
