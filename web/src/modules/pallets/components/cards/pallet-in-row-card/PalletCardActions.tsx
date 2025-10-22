import {
  CardActionsMenu,
  type CardAction,
} from "@/components/shared/card-actions";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { UpdatePalletDialogView } from "@/modules/pallets/components/dialogs/update-pallet-dialog/UpdatePalletDialogView";
import { Edit } from "lucide-react";
import { useState } from "react";

interface PalletCardActionsProps {
  pallet: PalletShortDto;
  rowId: string;
}

export function PalletCardActions({ pallet, rowId }: PalletCardActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleEditSuccess = () => {
    setIsEditOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditOpen(false);
  };

  const actions: CardAction[] = [
    {
      id: "edit",
      label: "Редагувати",
      icon: Edit,
      variant: "default",
      onClick: () => setIsEditOpen(true),
    },
    // Пока оставляем только редактирование, остальные действия можно добавить позже
    // если потребуется
  ];

  return (
    <>
      <CardActionsMenu
        actions={actions}
        orientation="horizontal"
        size="sm"
        align="end"
      />

      {/* Controlled dialog */}
      <UpdatePalletDialogView
        open={isEditOpen}
        setOpen={setIsEditOpen}
        pallet={pallet}
        rowId={rowId}
        onSuccess={handleEditSuccess}
        onCancel={handleEditCancel}
      />
    </>
  );
}
