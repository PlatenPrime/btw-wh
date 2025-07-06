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
      Delete
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Row</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete "{row.title}"? This action cannot be
            undone and will also delete all associated pallets and positions.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
