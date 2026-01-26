import { CreateAskDialog } from "@/modules/asks/components/dialogs/create-ask-dialog/CreateAskDialog";

interface AsksHeaderActionsViewProps {
  createAskDialogOpen: boolean;
  onCreateAskDialogOpenChange: (open: boolean) => void;
  onCreateAskSuccess: () => void;
}

export function AsksHeaderActionsView({
  createAskDialogOpen,
  onCreateAskDialogOpenChange,
  onCreateAskSuccess,
}: AsksHeaderActionsViewProps) {
  return (
    <CreateAskDialog
      open={createAskDialogOpen}
      onOpenChange={onCreateAskDialogOpenChange}
      onSuccess={onCreateAskSuccess}
    />
  );
}

