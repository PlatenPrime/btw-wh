import { CreateKonkDialog } from "@/modules/konks/components/dialogs/create-konk-dialog/CreateKonkDialog";

interface KonksHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
}

export function KonksHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
}: KonksHeaderActionsViewProps) {
  return (
    <CreateKonkDialog
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
    />
  );
}
