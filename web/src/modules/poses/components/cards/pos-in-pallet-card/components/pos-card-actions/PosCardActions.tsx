import {
  CardActionsMenu,
  type CardAction,
} from "@/components/shared/card-actions";
import type { IPos } from "@/modules/poses/api/types";
import { DeletePosDialog } from "@/modules/poses/components/dialogs/delete-pos-dialog/DeletePosDialog";
import { UpdatePosDialog } from "@/modules/poses/components/dialogs/update-pos-dialog/UpdatePosDialog";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

interface PosCardActionsProps {
  pos: IPos;
  onSuccess: () => void;
}

export function PosCardActions({ pos, onSuccess }: PosCardActionsProps) {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const actions: CardAction[] = [
    {
      id: "edit",
      label: "Редагувати",
      icon: Edit,
      variant: "default",
      onClick: () => setIsUpdateDialogOpen(true),
    },
    {
      id: "delete",
      label: "Видалити",
      icon: Trash,
      variant: "destructive",
      onClick: () => setIsDeleteDialogOpen(true),
    },
  ];

  return (
    <>
      <CardActionsMenu
        actions={actions}
        orientation="vertical"
        size="sm"
        align="end"
      />

      <UpdatePosDialog
        pos={pos}
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        onSuccess={onSuccess}
      />

      <DeletePosDialog
        pos={pos}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onSuccess={onSuccess}
      />
    </>
  );
}
