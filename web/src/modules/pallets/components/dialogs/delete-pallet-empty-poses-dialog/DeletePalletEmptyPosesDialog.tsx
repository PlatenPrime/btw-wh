import { useDeletePalletEmptyPosesMutation } from "@/modules/pallets/api/hooks/mutations/useDeletePalletEmptyPosesMutation";
import type { IPallet } from "@/modules/pallets/api/types";
import { DeletePalletEmptyPosesDialogView } from "@/modules/pallets/components/dialogs/delete-pallet-empty-poses-dialog/DeletePalletEmptyPosesDialogView";
import { useState } from "react";

interface DeletePalletEmptyPosesDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess: () => void;
}

export function DeletePalletEmptyPosesDialog({
  pallet,
  trigger,
  onSuccess,
}: DeletePalletEmptyPosesDialogProps) {
  const [open, setOpen] = useState(false);

  const deleteMutation = useDeletePalletEmptyPosesMutation({
    palletId: pallet._id,
    palletTitle: pallet.title,
  });

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync();
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Error deleting pallet empty poses:", error);
    }
  };

  return (
    <DeletePalletEmptyPosesDialogView
      pallet={pallet}
      handleDelete={handleDelete}
      deleteMutation={deleteMutation}
      trigger={trigger}
      open={open}
      setOpen={setOpen}
    />
  );
}
