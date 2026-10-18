import {
  CardActionsMenu,
  type CardAction,
} from "@/components/shared/actions/card-actions";
import { useRole } from "@/modules/auth/hooks/useRole";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { ChangePalletGroupDialog } from "@/modules/pallets/components/dialogs/change-pallet-group-dialog/ChangePalletGroupDialog";
import { UpdatePalletDialogView } from "@/modules/pallets/components/dialogs/update-pallet-dialog/UpdatePalletDialogView";
import { Edit, Layers } from "lucide-react";
import { useState } from "react";

interface PalletCardActionsProps {
  pallet: PalletShortDto;
  rowId: string;
}

export function PalletCardActions({ pallet, rowId }: PalletCardActionsProps) {
  const { isAdmin } = useRole();
  const canChangeGroup = isAdmin();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isChangeGroupOpen, setIsChangeGroupOpen] = useState(false);

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
  ];

  if (canChangeGroup) {
    actions.push({
      id: "change-group",
      label: "Змінити групу",
      icon: Layers,
      variant: "default",
      onClick: () => setIsChangeGroupOpen(true),
    });
  }

  return (
    <>
      <CardActionsMenu
        actions={actions}
        orientation="horizontal"
        size="sm"
        align="end"
      />

      <UpdatePalletDialogView
        open={isEditOpen}
        setOpen={setIsEditOpen}
        pallet={pallet}
        rowId={rowId}
        onSuccess={handleEditSuccess}
        onCancel={handleEditCancel}
      />

      {canChangeGroup ? (
        <ChangePalletGroupDialog
          open={isChangeGroupOpen}
          onOpenChange={setIsChangeGroupOpen}
          palletId={pallet._id}
          palletTitle={pallet.title}
          currentGroupId={pallet.palgrId}
        />
      ) : null}
    </>
  );
}
