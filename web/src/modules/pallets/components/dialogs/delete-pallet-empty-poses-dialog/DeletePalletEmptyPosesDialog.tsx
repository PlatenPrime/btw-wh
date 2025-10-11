import { useDeletePalletEmptyPosesMutation } from "@/modules/pallets/api/hooks/mutations/useDeletePalletEmptyPosesMutation";
import type { IPallet } from "@/modules/pallets/api/types";
import { DeletePalletEmptyPosesDialogView } from "@/modules/pallets/components/dialogs/delete-pallet-empty-poses-dialog/DeletePalletEmptyPosesDialogView";
import type { Dispatch, SetStateAction } from "react";
import { useMemo, useRef, useState } from "react";

interface DeletePalletEmptyPosesDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  // Поддержка контролируемого режима
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeletePalletEmptyPosesDialog({
  pallet,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: DeletePalletEmptyPosesDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  // Используем контролируемое состояние если передано, иначе внутреннее
  const open = controlledOpen ?? internalOpen;
  const openRef = useRef(open);
  openRef.current = open;

  // Создаем обертку для onOpenChange, которая принимает SetStateAction
  const setOpen: Dispatch<SetStateAction<boolean>> = useMemo(
    () => (value) => {
      const newValue =
        typeof value === "function" ? value(openRef.current) : value;
      if (onOpenChange) {
        onOpenChange(newValue);
      } else {
        setInternalOpen(newValue);
      }
    },
    [onOpenChange],
  );

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
