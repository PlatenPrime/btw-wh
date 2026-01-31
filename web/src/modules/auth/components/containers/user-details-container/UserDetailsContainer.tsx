import type { User } from "@/modules/auth/api/types";
import { UserDetailsCard } from "@/modules/auth/components/cards/user-details-card";
import { EditUserDialog } from "@/modules/auth/components/dialogs/edit-user-dialog";
import { useState } from "react";

interface UserDetailsContainerProps {
  user: User;
  onEdit?: (user: User) => void;
}

export function UserDetailsContainer({
  user,
  onEdit,
}: UserDetailsContainerProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEdit = () => setEditDialogOpen(true);

  return (
    <div className="grid gap-4">
      <UserDetailsCard
        user={user}
        onEdit={onEdit ?? handleEdit}
      />
      <EditUserDialog
        user={user}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </div>
  );
}
