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
import type { AskDto } from "@/modules/asks/api/types/dto";

export function AskDeleteButtonView({
  askData,
  handleDeleteAsk,
  isPending,
  open,
  setOpen,
}: {
  askData: AskDto;
  handleDeleteAsk: () => void;
  isPending: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <DeleteTrigger />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалити запит "{askData.artikul}"?</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити запит "{askData.artikul}"? Цю дію
            неможливо скасувати.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button
            variant="destructive"
            onClick={handleDeleteAsk}
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
