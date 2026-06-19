import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ListRowCard } from "@/components/shared/cards";
import { CardContent, CardHeader } from "@/components/ui/card";
import { iconSize, typography } from "@/lib/typography";
import { RoleType, getRoleLabel } from "@/constants/roles";
import type { User } from "@/modules/auth/api/types";
import { RoleGuard } from "@/modules/auth/components/elements/RoleGuard";
import { Edit } from "lucide-react";
import { Link } from "react-router";

interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

export function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <ListRowCard>
      <CardHeader className="flex flex-row items-center justify-between gap-2 p-0">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Avatar className="size-10 shrink-0">
            <AvatarImage src={user.photo} alt={user.fullname} />
            <AvatarFallback>
              {user.fullname?.charAt(0)?.toUpperCase() || "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
              <Link
                to={`/users/${user._id}`}
                className={typography.listTitleCompact}
              >
                {user.fullname}
              </Link>
              <span className={typography.caption}>
                {user.role ? getRoleLabel(user.role) : "—"}
              </span>
            </div>
            <span className={typography.listSubtitle}>@{user.username}</span>
          </div>
        </div>
        <div className="flex shrink-0 items-center">
          <RoleGuard allowedRoles={[RoleType.PRIME]}>
            <Button
              type="button"
              variant="edit-soft"
              size="icon-sm"
              aria-label="Редагувати"
              onClick={() => onEdit?.(user)}
            >
              <Edit className={iconSize.ui} />
            </Button>
          </RoleGuard>
        </div>
      </CardHeader>
      <CardContent className="grid gap-1 p-0 pt-2"></CardContent>
    </ListRowCard>
  );
}
