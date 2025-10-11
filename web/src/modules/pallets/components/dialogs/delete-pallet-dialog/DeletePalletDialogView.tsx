import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { DeleteTrigger } from "@/components/shared/triggers/delete-trigger/DeleteTrigger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import type {
  DeletePalletResponse,
  IPallet,
} from "@/modules/pallets/api/types";

import type { UseMutationResult } from "@tanstack/react-query";
import { type Dispatch, type ReactNode, type SetStateAction } from "react";

interface DeletePalletDialogViewProps {
  pallet: IPallet;
  handleDelete: () => void | Promise<void>;
  deleteMutation: UseMutationResult<
    DeletePalletResponse,
    unknown,
    string,
    unknown
  >;
  trigger?: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DeletePalletDialogView({
  pallet,
  handleDelete,
  deleteMutation,
  trigger,
  open,
  setOpen,
}: DeletePalletDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== undefined && (
        <DialogTrigger asChild>{trigger || <DeleteTrigger />}</DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалити палету "{pallet.title}"?</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити палету "{pallet.title}"? Цю дію
            неможливо скасувати, вона також призведе до видалення всіх
            пов'язаних позицій.
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
