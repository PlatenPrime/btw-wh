import { DeleteTrigger } from "@/components/triggers/delete-trigger.tsx/DeleteTrigger";
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
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? "Видалення..." : "Видалити"}
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
