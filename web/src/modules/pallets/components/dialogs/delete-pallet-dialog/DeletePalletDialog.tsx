import { useDeletePalletMutation } from "@/modules/pallets/api/hooks/mutations/useDeletePalletMutation";
import type { IPallet } from "@/modules/pallets/api/types";
import { DeletePalletDialogView } from "@/modules/pallets/components/dialogs/delete-pallet-dialog/DeletePalletDialogView.tsx";
import type { Dispatch, SetStateAction } from "react";
import { useMemo, useRef, useState } from "react";

interface DeletePalletDialogProps {
  pallet: IPallet;
  trigger?: React.ReactNode;
  onSuccess: () => void;
  // Поддержка контролируемого режима
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function DeletePalletDialog({
  pallet,
  trigger,
  onSuccess,
  open: controlledOpen,
  onOpenChange,
}: DeletePalletDialogProps) {
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
