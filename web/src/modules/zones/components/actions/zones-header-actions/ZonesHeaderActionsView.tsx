import { CreateZoneDialog } from "@/modules/zones/components/dialogs/create-zone-dialog";

interface ZonesHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
}

export function ZonesHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
}: ZonesHeaderActionsViewProps) {
  return (
    <CreateZoneDialog
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
    />
  );
}

