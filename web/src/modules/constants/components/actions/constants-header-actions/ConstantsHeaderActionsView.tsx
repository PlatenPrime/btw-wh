import { CreateConstantDialog } from "@/modules/constants/components/dialogs/create-constant-dialog/CreateConstantDialog";

interface ConstantsHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
}

export function ConstantsHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
}: ConstantsHeaderActionsViewProps) {
  return (
    <CreateConstantDialog
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
    />
  );
}
