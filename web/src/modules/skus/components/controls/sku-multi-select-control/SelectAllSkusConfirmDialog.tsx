import { DialogActions } from "@/components/shared/dialogs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SelectAllSkusConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  matchedTotal: number;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SelectAllSkusConfirmDialog({
  open,
  onOpenChange,
  matchedTotal,
  onConfirm,
  onCancel,
}: SelectAllSkusConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Вибрати всі результати?</DialogTitle>
          <DialogDescription>
            У вибірку потраплять усі {matchedTotal} артикулів за поточними
            фільтрами та пошуком — включно з тими, які ще не видно в списку
            через посторінкове завантаження. Окремі чекбокси на екрані для цього
            не потрібні.
          </DialogDescription>
        </DialogHeader>
        <DialogActions
          onCancel={onCancel}
          onSubmit={onConfirm}
          submitText="Вибрати всі"
          variant="default"
          className="justify-end"
        />
      </DialogContent>
    </Dialog>
  );
}
