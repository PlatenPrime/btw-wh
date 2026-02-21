import { CreateProdDialog } from "@/modules/prods/components/dialogs/create-prod-dialog/CreateProdDialog";

interface ProdsHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
}

export function ProdsHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
}: ProdsHeaderActionsViewProps) {
  return (
    <CreateProdDialog
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
    />
  );
}
