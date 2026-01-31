import { CreateUserDialog } from "@/modules/auth/components/dialogs/create-user-dialog";

interface UsersHeaderActionsViewProps {
  createDialogOpen: boolean;
  onCreateDialogOpenChange: (open: boolean) => void;
}

export function UsersHeaderActionsView({
  createDialogOpen,
  onCreateDialogOpenChange,
}: UsersHeaderActionsViewProps) {
  return (
    <CreateUserDialog
      open={createDialogOpen}
      onOpenChange={onCreateDialogOpenChange}
    />
  );
}
