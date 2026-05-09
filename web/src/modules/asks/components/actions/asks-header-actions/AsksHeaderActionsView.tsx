import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";

interface AsksHeaderActionsViewProps {
  showCreateDialog?: boolean;
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AsksHeaderActionsView({
  showCreateDialog = true,
  createDialogOpen,
  onCreateDialogOpenChange,
  onSuccess,
}: AsksHeaderActionsViewProps) {
  if (!showCreateDialog) {
    return null;
  }
  return (
    <CreateAskDialog
      showTrigger={false}
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
      onSuccess={onSuccess}
    />
  );
}
