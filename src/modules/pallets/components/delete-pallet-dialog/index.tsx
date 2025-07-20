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
import { useDeletePalletMutation } from "../../api/usePalletMutation";
import type { IPallet } from "../../types";

interface DeletePalletDialogProps {
  pallet: IPallet;
  rowId: string;
  trigger: React.ReactNode;
  onSuccess?: () => void;
}

export function DeletePalletDialog({
  pallet,
  rowId,
  trigger,
  onSuccess,
}: DeletePalletDialogProps) {
  const [open, setOpen] = useState(false);
  const mutation = useDeletePalletMutation(rowId);

  const handleDelete = async () => {
    try {
      await mutation.mutateAsync(pallet._id);
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
          <DialogTitle>Видалити паллету?</DialogTitle>
        </DialogHeader>
        <div className="py-2 text-sm">
          Ви дійсно хочете видалити паллету <b>{pallet.title}</b>? Всі її
          позиції також будуть видалені!
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
