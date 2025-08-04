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
import type { IPos } from "@/modules/poses/api";
import type { UseMutationResult } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface DeletePosDialogViewProps {
  pos: IPos;
  handleDelete: () => void | Promise<void>;
  deleteMutation: UseMutationResult<any, unknown, string, unknown>;
  trigger?: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DeletePosDialogView({
  pos,
  handleDelete,
  deleteMutation,
  trigger,
  open,
  setOpen,
}: DeletePosDialogViewProps) {
  const defaultTrigger = (
    <Button variant="destructive" size="sm">
      <Trash className="mr-2 h-4 w-4" />
      Видалити
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалити позицію "{pos.artikul}"?</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити позицію "{pos.artikul}"? Цю дію
            неможливо скасувати.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="grid grid-cols-2 gap-2">
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Видалення.." : "Видалити"}
          </Button>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleteMutation.isPending}
          >
            Скасувати
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
