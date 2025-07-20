import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useDeletePosMutation } from "../../api/usePosMutation";
import type { IPos } from "../../types";

interface DeletePosDialogProps {
  pos: IPos;
  palletId: string;
  trigger: React.ReactNode;
  onSuccess?: () => void;
}

export function DeletePosDialog({
  pos,
  palletId,
  trigger,
  onSuccess,
}: DeletePosDialogProps) {
  const [open, setOpen] = useState(false);
  const mutation = useDeletePosMutation(palletId);

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync(pos._id);
      setOpen(false);
      onSuccess?.();
    } catch (e) {
      // TODO: обработка ошибок
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалити позицію?</DialogTitle>
        </DialogHeader>
        <div className="py-2 text-sm">
          Ви дійсно хочете видалити позицію <b>{pos.artikul}</b>?
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={mutation.isPending}
          >
            Скасувати
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            Видалити
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
