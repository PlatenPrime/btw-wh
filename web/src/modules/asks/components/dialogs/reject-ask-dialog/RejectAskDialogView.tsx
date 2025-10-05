import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { CancelTrigger } from "@/components/shared/triggers/cancel-trigger/CancelTrigger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
      <DialogTrigger asChild>
        <CancelTrigger />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Відмовити від запиту "{artikul}"?</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете відмовити від запиту "{artikul}"? Ця дія
            змінить статус запиту на "відмінено".
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
