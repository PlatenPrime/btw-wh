import { DialogActions } from "@/components/shared/dialog-actions/DialogActions";
import { ClearZeroTrigger } from "@/components/shared/triggers/clear-zero-trigger/ClearZeroTrigger";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import type { ClearPalletResponse, IPallet } from "@/modules/pallets/api/types";

import type { UseMutationResult } from "@tanstack/react-query";
import { type Dispatch, type ReactNode, type SetStateAction } from "react";

interface DeletePalletEmptyPosesDialogViewProps {
  pallet: IPallet;
  handleDelete: () => void | Promise<void>;
  deleteMutation: UseMutationResult<ClearPalletResponse, Error, void, unknown>;
  trigger?: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export function DeletePalletEmptyPosesDialogView({
  pallet,
  handleDelete,
  deleteMutation,
  trigger,
  open,
  setOpen,
}: DeletePalletEmptyPosesDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="">
        {trigger || <ClearZeroTrigger />}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Видалити порожні позиції палети "{pallet.title}"?
          </DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити тільки порожні позиції? Цю дію
            неможливо скасувати.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogActions
            onCancel={() => setOpen(false)}
            onSubmit={handleDelete}
            cancelText="Скасувати"
            submitText="Видалити порожні"
            isSubmitting={deleteMutation.isPending}
            variant="destructive"
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
