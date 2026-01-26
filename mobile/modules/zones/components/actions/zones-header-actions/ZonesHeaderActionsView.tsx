import { CreateZoneDialog } from "@/modules/zones/components/dialogs/create-zone-dialog/CreateZoneDialog";

interface ZonesHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
  onCreateSuccess: () => void;
}

export function ZonesHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
  onCreateSuccess,
}: ZonesHeaderActionsViewProps) {
  return (
    <CreateZoneDialog
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
      onSuccess={onCreateSuccess}
    />
  );
}

