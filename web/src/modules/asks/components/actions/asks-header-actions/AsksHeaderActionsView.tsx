import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";

interface AsksHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AsksHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
  onSuccess,
}: AsksHeaderActionsViewProps) {
  return (
    <CreateAskDialog
      showTrigger={false}
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
      onSuccess={onSuccess}
    />
  );
}
