import { CreatePalletGroupDialog } from "@/modules/pallet-groups/components/dialogs/create-pallet-group-dialog/CreatePalletGroupDialog";

interface PalletGroupsHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
}

export function PalletGroupsHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
}: PalletGroupsHeaderActionsViewProps) {
  return (
    <CreatePalletGroupDialog
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
    />
  );
}
