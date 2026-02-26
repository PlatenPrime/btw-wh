import { CreateAnalogDialog } from "@/modules/analogs/components/dialogs/create-analog-dialog";

interface AnalogsHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
}

export function AnalogsHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
}: AnalogsHeaderActionsViewProps) {
  return (
    <CreateAnalogDialog
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
    />
  );
}
