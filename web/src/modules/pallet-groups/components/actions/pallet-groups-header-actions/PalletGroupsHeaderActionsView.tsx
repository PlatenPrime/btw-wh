import { CreatePalletGroupDialog } from "@/modules/pallet-groups/components/dialogs/create-pallet-group-dialog/CreatePalletGroupDialog";
import { ResetPalletsSectorsConfirmDialog } from "@/modules/pallet-groups/components/dialogs/reset-pallets-sectors-confirm-dialog/ResetPalletsSectorsConfirmDialog";

interface PalletGroupsHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
  isResetConfirmOpen: boolean;
  onResetConfirmOpenChange: (open: boolean) => void;
  onResetConfirm: () => void;
  onResetCancel: () => void;
  isResetPending: boolean;
}

export function PalletGroupsHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
  isResetConfirmOpen,
  onResetConfirmOpenChange,
  onResetConfirm,
  onResetCancel,
  isResetPending,
}: PalletGroupsHeaderActionsViewProps) {
  return (
    <>
      <CreatePalletGroupDialog
        open={createDialogOpen}
        onOpenChange={onCreateDialogOpenChange}
      />
      <ResetPalletsSectorsConfirmDialog
        open={isResetConfirmOpen}
        onOpenChange={onResetConfirmOpenChange}
        onConfirm={onResetConfirm}
        onCancel={onResetCancel}
        isPending={isResetPending}
      />
    </>
  );
}
