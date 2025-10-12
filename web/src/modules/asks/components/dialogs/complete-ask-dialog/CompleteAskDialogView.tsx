import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ExecuteAskDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleExecute: () => void;
  isPending: boolean;
  artikul: string;
}

export function CompleteAskDialogView({
  open,
  setOpen,
  handleExecute,
  isPending,
  artikul,
}: ExecuteAskDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
            onCancel={() => setOpen(false)}
            onSubmit={handleExecute}
            cancelText="Скасувати"
            submitText="Виконати"
            isSubmitting={isPending}
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
