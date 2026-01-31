import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { RoleType, getRoleLabel } from "@/constants/roles";
import type { User } from "@/modules/auth/api/types";
import { RoleGuard } from "@/modules/auth/components/RoleGuard";
import { Edit } from "lucide-react";
import { Link } from "react-router";

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

export function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between gap-2 p-0">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Avatar className="size-10 shrink-0">
            <AvatarImage src={user.photo} alt={user.fullname} />
            <AvatarFallback>
              {user.fullname?.charAt(0)?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <Link
              to={`/users/${user._id}`}
              className="truncate font-medium hover:underline"
            >
              {user.fullname}
            </Link>
            <span className="text-muted-foreground truncate text-sm">
             @{user.username}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="text-muted-foreground text-xs">
            {user.role ? getRoleLabel(user.role) : "—"}
          </span>
          <RoleGuard allowedRoles={[RoleType.PRIME]}>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Редагувати"
              onClick={() => onEdit?.(user)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </RoleGuard>
        </div>
      </CardHeader>
      <CardContent className="grid gap-1 p-0 pt-2"></CardContent>
    </Card>
  );
}
