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
import { useState } from "react";
import { useDeleteRowMutation } from "../../api/useDeleteRowMutation";
import type { RowDto } from "../../types/dto";

interface DeleteRowDialogProps {
  row: RowDto;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function DeleteRowDialog({
  row,
  trigger,
  onSuccess,
}: DeleteRowDialogProps) {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteRowMutation();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(row._id);
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error deleting row:", error);
    }
  };

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
          Ви впевнені, що хочете видалити ряд "{row.title}"? Цю дію неможливо скасувати, вона також призведе до видалення всіх пов'язаних палет та позицій.
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
