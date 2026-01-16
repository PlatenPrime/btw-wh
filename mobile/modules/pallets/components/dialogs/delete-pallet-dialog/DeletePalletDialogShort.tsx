import type { PalletShortDto } from "@/modules/pallets/api/types";
import { useState } from "react";
import { DeletePalletDialogView } from "./DeletePalletDialogView";
import { useDeletePalletDialogShort } from "./useDeletePalletDialogShort";

interface DeletePalletDialogShortProps {
  pallet: PalletShortDto;
  rowId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DeletePalletDialogShort({
  pallet,
  rowId,
  open: controlledOpen,
  onOpenChange,
  onSuccess,
}: DeletePalletDialogShortProps) {
  const [internalOpen, setInternalOpen] = useState(false);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  const { isDeleting, handleDelete } = useDeletePalletDialogShort({
    pallet,
    rowId,
    onSuccess,
  });

  const handleDeleteAndClose = async () => {
    await handleDelete();
    handleOpenChange?.(false);
  };

  const handleCancel = () => {
    handleOpenChange?.(false);
  };

  // Создаем минимальный объект IPallet для совместимости с DeletePalletDialogView
  const palletForView = {
    _id: pallet._id,
    title: pallet.title,
    row: rowId,
    rowData: { _id: rowId, title: "" },
    poses: [],
    sector: pallet.sector,
    isDef: pallet.isDef,
  };

  return (
    <DeletePalletDialogView
      pallet={palletForView}
      visible={open}
      onClose={handleCancel}
      onDelete={handleDeleteAndClose}
      isDeleting={isDeleting}
    />
  );
}
