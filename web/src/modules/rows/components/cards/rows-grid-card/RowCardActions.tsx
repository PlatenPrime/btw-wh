import {
  CardActionsMenu,
  type CardAction,
} from "@/components/shared/card-actions";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { DeleteRowDialog } from "@/modules/rows/components/dialogs/delete-row-dialog/DeleteRowDialog";
import { UpdateRowDialogView } from "@/modules/rows/components/dialogs/update-row-dialog/UpdateRowDialogView";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";

interface RowCardActionsProps {
  row: RowDto;
}

export function RowCardActions({ row }: RowCardActionsProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const handleEditSuccess = () => {
    setIsEditOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditOpen(false);
  };

  const handleDeleteSuccess = () => {
    setIsDeleteOpen(false);
  };

  const actions: CardAction[] = [
    {
      id: "edit",
      label: "Редагувати",
      icon: Edit,
      variant: "default",
      onClick: () => setIsEditOpen(true),
    },
    {
      id: "delete",
      label: "Видалити",
      icon: Trash,
      variant: "destructive",
      onClick: () => setIsDeleteOpen(true),
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

      {/* Controlled dialogs */}
      <UpdateRowDialogView
        open={isEditOpen}
        setOpen={setIsEditOpen}
        row={row}
        onSuccess={handleEditSuccess}
        onCancel={handleEditCancel}
      />

      <DeleteRowDialog
        row={row}
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onSuccess={handleDeleteSuccess}
      />
    </>
  );
}
