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
import type { UseMutationResult } from "@tanstack/react-query";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import type { DeleteRowResponse, RowDto } from "@/modules/rows/api/types/dto";

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
  const defaultTrigger = (
    <Button variant="destructive" size="sm">
      Видалити
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Видалити ряд "{row.title}"?</DialogTitle>
          <DialogDescription>
            Ви впевнені, що хочете видалити ряд "{row.title}"? Цю дію неможливо
            скасувати, вона також призведе до видалення всіх пов'язаних палет та
            позицій.
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
