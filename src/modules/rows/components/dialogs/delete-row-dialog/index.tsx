import { useState } from "react";
import { useDeleteRowMutation } from "@/modules/rows/api";
import type { RowDto } from "@/modules/rows/api/types/dto";
import DeleteRowDialogView from "./view";

interface DeleteRowDialogProps {
  row: RowDto;
  trigger?: React.ReactNode;
  
}

export function DeleteRowDialog({
  row,
  trigger,

}: DeleteRowDialogProps) {
  const [open, setOpen] = useState(false);
  const deleteMutation = useDeleteRowMutation();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(row._id);
      setOpen(false);
   
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
