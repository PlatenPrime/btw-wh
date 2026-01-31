import type { User } from "@/modules/auth/api/types";
import { UsersList } from "@/modules/auth/components/lists/users-list";

interface UsersContainerProps {
  data: User[];
  onEdit?: (user: User) => void;
}

export function UsersContainer({ data, onEdit }: UsersContainerProps) {
  return <UsersList users={data} onEdit={onEdit} />;
}
