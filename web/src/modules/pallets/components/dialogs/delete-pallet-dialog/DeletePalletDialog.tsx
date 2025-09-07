import { useDeletePalletMutation } from "@/modules/pallets/api/hooks/mutations/useDeletePalletMutation";
import type { IPallet } from "@/modules/pallets/api/types";
import { useState } from "react";
import {DeletePalletDialogView} from "./DeletePalletDialogView";

interface DeletePalletDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess: () => void;
}

export function DeletePalletDialog({
  pallet,
  trigger,
  onSuccess,
}: DeletePalletDialogProps) {
  const [open, setOpen] = useState(false);

  const deleteMutation = useDeletePalletMutation(pallet.rowData._id);

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(pallet._id);
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Error deleting pallet:", error);
    }
  };

  return (
    <DeletePalletDialogView
      pallet={pallet}
      handleDelete={handleDelete}
      deleteMutation={deleteMutation}
      trigger={trigger}
      open={open}
      setOpen={setOpen}
    />
  );
}
