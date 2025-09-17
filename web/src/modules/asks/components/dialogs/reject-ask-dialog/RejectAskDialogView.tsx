import { CancelTrigger } from "@/components/shared/triggers/cancel-trigger/CancelTrigger";
import { Button } from "@/components/ui/button";
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
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button
            variant="destructive"
            onClick={handleReject}
            disabled={isPending}
          >
            {isPending ? "Відмова..." : "Відмовити"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isPending}
          >
            Скасувати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
