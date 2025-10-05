import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { CheckTrigger } from "@/components/shared/triggers/check-trigger/CheckTrigger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
      <DialogTrigger asChild>
        <CheckTrigger />
      </DialogTrigger>
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
