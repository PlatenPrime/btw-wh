import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface RejectAskDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleReject: () => void;
  isPending: boolean;
  artikul: string;
}

export function RejectAskDialogView({
  open,
  setOpen,
  handleReject,
  isPending,
  artikul,
}: RejectAskDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Відмовити на запит "{artikul}"?</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете відмовити на запит "{artikul}"? Ця дія
            змінить статус запиту на "відмовлено".
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogActions
            onCancel={() => setOpen(false)}
            onSubmit={handleReject}
            cancelText="Скасувати"
            submitText="Відмовити"
            isSubmitting={isPending}
            variant="destructive"
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
