import { SidebarInsetLayout } from "@/components/layout/SidebarInsetLayout";
import type { User } from "@/modules/auth/api/types";
import { UsersHeaderActions } from "@/modules/auth/components/actions/users-header-actions";
import {
  UsersContainer,
  UsersContainerSkeleton,
} from "@/modules/auth/components/containers/users-container";
import { EditUserDialog } from "@/modules/auth/components/dialogs/edit-user-dialog";
import { UsersFetcher } from "@/modules/auth/components/fetchers/users-fetcher";
import { useState } from "react";

export function UsersPage() {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  return (
    <SidebarInsetLayout headerText="Користувачі">
      <div className="grid gap-2 p-2">
        <UsersHeaderActions />
        <UsersFetcher
          ContainerComponent={({ data }) => (
            <UsersContainer data={data} onEdit={handleEdit} />
          )}
          SkeletonComponent={UsersContainerSkeleton}
        />

        {selectedUser && (
          <EditUserDialog
            user={selectedUser}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
          />
        )}
      </div>
    </SidebarInsetLayout>
  );
}
