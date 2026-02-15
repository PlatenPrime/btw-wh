import { CreateDelDialog } from "@/modules/dels/components/dialogs/create-del-dialog";

interface DelsHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
}

export function DelsHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
}: DelsHeaderActionsViewProps) {
  return (
    <CreateDelDialog
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
    />
  );
}
