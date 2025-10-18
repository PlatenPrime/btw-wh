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
} from "@/components/ui/dialog";
import type { DeleteRowResponse, RowDto } from "@/modules/rows/api/types";
import type { UseMutationResult } from "@tanstack/react-query";
import type { Dispatch, ReactNode, SetStateAction } from "react";

interface DeleteRowDialogViewProps {
  row: RowDto;
  handleDelete: () => void | Promise<void>;
  deleteMutation: UseMutationResult<
    DeleteRowResponse,
    unknown,
    string,
    unknown
  >;
  trigger?: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DeleteRowDialogView({
  row,
  handleDelete,
  deleteMutation,
  trigger,
  open,
  setOpen,
}: DeleteRowDialogViewProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {trigger !== undefined && (
        <DialogTrigger asChild>{trigger || <DeleteTrigger />}</DialogTrigger>
      )}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалити ряд "{row.title}"?</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити ряд "{row.title}"? Цю дію неможливо
            скасувати, вона також призведе до видалення всіх пов'язаних палет та
            позицій.
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
