import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { DeleteTrigger } from "@/components/shared/triggers/delete-trigger/DeleteTrigger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
      <DialogTrigger asChild>
        <DeleteTrigger />
      </DialogTrigger>
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
