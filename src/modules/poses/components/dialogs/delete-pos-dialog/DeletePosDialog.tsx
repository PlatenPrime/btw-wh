import type { IPos } from "@/modules/poses/api";
import { useDeletePosMutation } from "@/modules/poses/api";
import { useState } from "react";
import { DeletePosDialogView } from "./DeletePosDialogView";

interface DeletePosDialogProps {
  pos: IPos;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

export function DeletePosDialog({
  pos,
  trigger,
  onSuccess,
}: DeletePosDialogProps) {
  const [open, setOpen] = useState(false);
  const deletePosMutation = useDeletePosMutation(pos);

  const handleDelete = async () => {
    try {
      await deletePosMutation.mutateAsync(pos._id);
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error("Error deleting pos:", error);
    }
  };

  return (
    <DeletePosDialogView
      pos={pos}
      handleDelete={handleDelete}
      deleteMutation={deletePosMutation}
      trigger={trigger}
      open={open}
      setOpen={setOpen}
    />
  );
}
