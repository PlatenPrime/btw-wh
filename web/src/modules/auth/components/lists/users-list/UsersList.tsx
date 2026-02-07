import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { User } from "@/modules/auth/api/types";
import { UserCard } from "@/modules/auth/components/cards/user-card";

interface UsersListProps {
  users: User[];
  onEdit?: (user: User) => void;
}

export function UsersList({ users, onEdit }: UsersListProps) {
  return (
    <Wrapper className="grid gap-2">
      {users.map((user) => (
        <UserCard key={user._id} user={user} onEdit={onEdit} />
      ))}
    </Wrapper>
  );
}
