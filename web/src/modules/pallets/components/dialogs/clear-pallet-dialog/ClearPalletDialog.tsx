import { useDeletePalletPosesMutation } from "@/modules/pallets/api/hooks/mutations/useDeletePalletPosesMutation";
import type { IPallet } from "@/modules/pallets/api/types";
import { ClearPalletDialogView } from "@/modules/pallets/components/dialogs/clear-pallet-dialog/ClearPalletDialogView.tsx";
import { useState } from "react";

interface DeletePalletDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess: () => void;
}

export function ClearPalletDialog({
  pallet,
  trigger,
  onSuccess,
}: DeletePalletDialogProps) {
  const [open, setOpen] = useState(false);

  const clearMutation = useDeletePalletPosesMutation({
    palletId: pallet._id,
    palletTitle: pallet.title,
  });

  const handleClear = async () => {
    try {
      await clearMutation.mutateAsync();
      setOpen(false);
      onSuccess();
    } catch (error) {
      console.error("Error deleting pallet:", error);
    }
  };

  return (
    <ClearPalletDialogView
      pallet={pallet}
      handleClear={handleClear}
      clearMutation={clearMutation}
      trigger={trigger}
      open={open}
      setOpen={setOpen}
    />
  );
}
