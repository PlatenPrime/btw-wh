import type { User } from "@/modules/auth/api/types";
import { UserDetailsContainerView } from "./UserDetailsContainerView";
import { useState } from "react";

export interface UserDetailsContainerProps {
  user: User;
  onEdit?: (user: User) => void;
}

export function UserDetailsContainer({
  user,
  onEdit,
}: UserDetailsContainerProps) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(user);
      return;
    }
    setEditDialogOpen(true);
  };

  return (
    <UserDetailsContainerView
      user={user}
      editDialogOpen={editDialogOpen}
      onEditDialogOpenChange={setEditDialogOpen}
      onEdit={handleEditClick}
    />
  );
}
