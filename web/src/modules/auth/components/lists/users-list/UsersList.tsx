import { UserCard } from "@/modules/auth/components/cards/user-card";
import type { User } from "@/modules/auth/api/types";

interface UsersListProps {
  users: User[];
  onEdit?: (user: User) => void;
}

export function UsersList({ users, onEdit }: UsersListProps) {
  return (
    <div className="grid gap-2">
      {users.map((user) => (
        <UserCard key={user._id} user={user} onEdit={onEdit} />
      ))}
    </div>
  );
}
