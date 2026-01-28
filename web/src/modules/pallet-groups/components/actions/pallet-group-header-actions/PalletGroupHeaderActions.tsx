import type { HeaderAction } from "@/components/layout/header-actions";
import { useRegisterHeaderActions } from "@/components/layout/header-actions";
import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { PalletGroupHeaderActionsView } from "@/modules/pallet-groups/components/actions/pallet-group-header-actions/PalletGroupHeaderActionsView";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

interface PalletGroupHeaderActionsProps {
  group: PalletGroupDto;
}

export function PalletGroupHeaderActions({
  group,
}: PalletGroupHeaderActionsProps) {
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const openAddDialog = useCallback(() => {
    setAddDialogOpen(true);
  }, []);

  const openRenameDialog = useCallback(() => {
    setRenameDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback(() => {
    setDeleteDialogOpen(true);
  }, []);

  const headerActions = useMemo<HeaderAction[]>(
    () => [
      {
        id: "add-pallets-to-group",
        label: "Додати палети",
        icon: Plus,
        iconColor: "emerald",
        variant: "default",
        onClick: openAddDialog,
      },
      {
        id: "rename-pallet-group",
        label: "Перейменувати групу",
        icon: Pencil,
        iconColor: "blue",
        variant: "default",
        onClick: openRenameDialog,
      },
      {
        id: "delete-pallet-group",
        label: "Видалити групу",
        icon: Trash2,
        iconColor: "red",
        variant: "super-destructive",
        onClick: openDeleteDialog,
      },
    ],
    [openAddDialog, openDeleteDialog, openRenameDialog],
  );

  useRegisterHeaderActions(headerActions);

  return (
    <PalletGroupHeaderActionsView
      group={group}
      addDialogOpen={addDialogOpen}
      onAddDialogOpenChange={setAddDialogOpen}
      renameDialogOpen={renameDialogOpen}
      onRenameDialogOpenChange={setRenameDialogOpen}
      deleteDialogOpen={deleteDialogOpen}
      onDeleteDialogOpenChange={setDeleteDialogOpen}
    />
  );
}
