import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DeleteAskDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleDelete: () => void;
  isPending: boolean;
  artikul: string;
}

export function DeleteAskDialogView({
  open,
  setOpen,
  handleDelete,
  isPending,
  artikul,
}: DeleteAskDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалити запит "{artikul}"?</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити запит "{artikul}"? Цю дію неможливо
            скасувати.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogActions
            onCancel={() => setOpen(false)}
            onSubmit={handleDelete}
            cancelText="Скасувати"
            submitText="Видалити"
            isSubmitting={isPending}
            variant="destructive"
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
