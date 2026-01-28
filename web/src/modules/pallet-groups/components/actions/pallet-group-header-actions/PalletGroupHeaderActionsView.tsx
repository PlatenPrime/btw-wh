import type { PalletGroupDto } from "@/modules/pallet-groups/api/types";
import { AddPalletsToGroupDialog } from "@/modules/pallet-groups/components/dialogs/add-pallets-to-group-dialog/AddPalletsToGroupDialog";
import { DeletePalletGroupHeaderDialog } from "@/modules/pallet-groups/components/dialogs/delete-pallet-group-header-dialog/DeletePalletGroupHeaderDialog";
import { RenamePalletGroupDialog } from "@/modules/pallet-groups/components/dialogs/rename-pallet-group-dialog/RenamePalletGroupDialog";

interface PalletGroupHeaderActionsViewProps {
  group: PalletGroupDto;
  addDialogOpen: boolean;
  onAddDialogOpenChange: (open: boolean) => void;
  renameDialogOpen: boolean;
  onRenameDialogOpenChange: (open: boolean) => void;
  deleteDialogOpen: boolean;
  onDeleteDialogOpenChange: (open: boolean) => void;
}

export function PalletGroupHeaderActionsView({
  group,
  addDialogOpen,
  onAddDialogOpenChange,
  renameDialogOpen,
  onRenameDialogOpenChange,
  deleteDialogOpen,
  onDeleteDialogOpenChange,
}: PalletGroupHeaderActionsViewProps) {
  return (
    <>
      <AddPalletsToGroupDialog
        group={group}
        open={addDialogOpen}
        onOpenChange={onAddDialogOpenChange}
      />
      <RenamePalletGroupDialog
        group={group}
        open={renameDialogOpen}
        onOpenChange={onRenameDialogOpenChange}
      />
      <DeletePalletGroupHeaderDialog
        group={group}
        open={deleteDialogOpen}
        onOpenChange={onDeleteDialogOpenChange}
      />
    </>
  );
}
