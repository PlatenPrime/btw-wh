import type { User } from "@/modules/auth/api/types";
import { UserDetailsCard } from "@/modules/auth/components/cards/user-details-card";
import { EditUserDialog } from "@/modules/auth/components/dialogs/edit-user-dialog";

export interface UserDetailsContainerViewProps {
  user: User;
  editDialogOpen: boolean;
  onEditDialogOpenChange: (open: boolean) => void;
  onEdit: () => void;
}

export function UserDetailsContainerView({
  user,
  editDialogOpen,
  onEditDialogOpenChange,
  onEdit,
}: UserDetailsContainerViewProps) {
  return (
    <div className="grid gap-4">
      <UserDetailsCard user={user} onEdit={onEdit} />
      <EditUserDialog
        user={user}
        open={editDialogOpen}
        onOpenChange={onEditDialogOpenChange}
      />
    </div>
  );
}
