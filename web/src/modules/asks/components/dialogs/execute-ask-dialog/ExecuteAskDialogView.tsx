import { CheckTrigger } from "@/components/shared/triggers/check-trigger/CheckTrigger";
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

interface ExecuteAskDialogViewProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleExecute: () => void;
  isPending: boolean;
  artikul: string;
}

export function ExecuteAskDialogView({
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
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button
            variant="default"
            onClick={handleExecute}
            disabled={isPending}
          >
            {isPending ? "Виконання..." : "Виконати"}
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
