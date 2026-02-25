import type { ConstantDto } from "@/modules/constants/api/types";
import { useState } from "react";
import {
  EditConstantEntryDialog,
  type ConstantEntry,
} from "@/modules/constants/components/dialogs/edit-constant-entry-dialog";
import { DeleteConstantEntryDialog } from "@/modules/constants/components/dialogs/delete-constant-entry-dialog";
import { ConstantDetailsCardView } from "./ConstantDetailsCardView";

interface ConstantDetailsCardProps {
  constant: ConstantDto;
  canEdit: boolean;
}

export function ConstantDetailsCard({
  constant,
  canEdit,
}: ConstantDetailsCardProps) {
  const [editingEntry, setEditingEntry] = useState<ConstantEntry | null>(null);
  const [deletingEntry, setDeletingEntry] = useState<ConstantEntry | null>(null);

  const handleEditEntry = (entry: ConstantEntry) => {
    setEditingEntry(entry);
  };

  const handleDeleteEntry = (entry: ConstantEntry) => {
    setDeletingEntry(entry);
  };

  const handleEditDialogOpenChange = (open: boolean) => {
    if (!open) {
      setEditingEntry(null);
    }
  };

  const handleDeleteDialogOpenChange = (open: boolean) => {
    if (!open) {
      setDeletingEntry(null);
    }
  };

  const handleEditSuccess = () => {
    setEditingEntry(null);
  };

  const handleDeleteSuccess = () => {
    setDeletingEntry(null);
  };

  return (
    <>
      <ConstantDetailsCardView
        constant={constant}
        canEdit={canEdit}
        onEditEntry={handleEditEntry}
        onDeleteEntry={handleDeleteEntry}
      />

      {canEdit && (
        <>
          <EditConstantEntryDialog
            constant={constant}
            entry={editingEntry}
            open={editingEntry !== null}
            onOpenChange={handleEditDialogOpenChange}
            onSuccess={handleEditSuccess}
          />
          <DeleteConstantEntryDialog
            constant={constant}
            entry={deletingEntry}
            open={deletingEntry !== null}
            onOpenChange={handleDeleteDialogOpenChange}
            onSuccess={handleDeleteSuccess}
          />
        </>
      )}
    </>
  );
}

