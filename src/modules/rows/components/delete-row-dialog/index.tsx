import { useState } from "react";
import { useDeleteRowMutation } from "../../api/useDeleteRowMutation";
import type { RowDto } from "../../types/dto";
import DeleteRowDialogView from "./view";

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

  return (
    <DeleteRowDialogView
      row={row}
      handleDelete={handleDelete}
      deleteMutation={deleteMutation}
      trigger={trigger}
      open={open}
      setOpen={setOpen}
    />
  );
}
