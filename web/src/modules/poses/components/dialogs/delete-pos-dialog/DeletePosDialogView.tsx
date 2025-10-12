import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { IPos } from "@/modules/poses/api/types";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface DeletePosDialogViewProps {
  pos: IPos;
  handleDelete: () => void | Promise<void>;
  deleteMutation: UseMutationResult<unknown, unknown, string, unknown>;
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
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалити позицію "{pos.artikul}"?</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити позицію "{pos.artikul}"? Цю дію
            неможливо скасувати.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogActions
            onCancel={() => setOpen(false)}
            onSubmit={handleDelete}
            cancelText="Скасувати"
            submitText="Видалити"
            isSubmitting={deleteMutation.isPending}
            variant="destructive"
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
