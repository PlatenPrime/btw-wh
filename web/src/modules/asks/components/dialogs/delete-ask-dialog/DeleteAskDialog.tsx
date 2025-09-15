import { useState } from "react";
import { DeleteAskDialogView } from "./DeleteAskDialogView";

interface DeleteAskDialogProps {
  handleDeleteAsk: () => void;
  isPending: boolean;
  artikul: string;
}

export function DeleteAskDialog({
  handleDeleteAsk,
  isPending,
  artikul,
}: DeleteAskDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await handleDeleteAsk();
      setOpen(false);
    } catch (error) {
      console.error("Error deleting ask:", error);
    }
  };
  return (
    <DeleteAskDialogView
      open={open}
      setOpen={setOpen}
      handleDelete={handleDelete}
      isPending={isPending}
      artikul={artikul}
    />
  );
}
