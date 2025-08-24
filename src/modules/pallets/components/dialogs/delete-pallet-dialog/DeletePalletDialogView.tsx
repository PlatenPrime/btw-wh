import { DeleteTrigger } from "@/components/triggers/delete-trigger.tsx/DeleteTrigger";
import {
  Button,
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

export default function DeletePalletDialogView({
  pallet,
  handleDelete,
  deleteMutation,
  trigger,
  open,
  setOpen,
}: DeletePalletDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="">
        {trigger || <DeleteTrigger />}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалити ряд "{pallet.title}"?</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити палету "{pallet.title}"? Цю дію
            неможливо скасувати, вона також призведе до видалення всіх
            пов'язаних позицій.
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
