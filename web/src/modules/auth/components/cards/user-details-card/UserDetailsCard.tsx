import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DetailPanelCard } from "@/components/shared/cards";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RoleType, getRoleLabel } from "@/constants/roles";
import { RoleGuard } from "@/modules/auth/components/elements/RoleGuard";
import type { User } from "@/modules/auth/api/types";
import { formatDate } from "@/utils/formatDate";
import {
  Calendar,
  Edit,
  ExternalLink,
  Image,
  Send,
  Shield,
  User as UserIcon,
} from "lucide-react";

interface UserDetailsCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

function MetadataItem({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1">
      <span className={cn("flex items-center gap-1.5", typography.detailSubtitle)}>
        <Icon className={iconSize.ui} />
        {label}
      </span>
      {children}
    </div>
  );
}

export function UserDetailsCard({ user, onEdit }: UserDetailsCardProps) {
  return (
    <DetailPanelCard className="gap-0 overflow-hidden border-l-4 border-l-primary p-0">
      <CardHeader className="flex flex-row items-center gap-4 p-6 pb-4">
        <Avatar className="size-32 shrink-0 ring-2 ring-primary/20">
          <AvatarImage src={user.photo} alt={user.fullname} />
          <AvatarFallback className="text-2xl">
            {user.fullname?.charAt(0)?.toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <h2 className={typography.pageTitle}>{user.fullname}</h2>
          <RoleGuard allowedRoles={[RoleType.PRIME]}>
            {onEdit && (
              <div className="flex">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(user)}
                  aria-label="Редагувати"
                >
                  <Edit className={cn(iconSize.ui, "mr-2")} />
                  Редагувати
                </Button>
              </div>
            )}
          </RoleGuard>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="grid grid-cols-2 gap-4 p-6">
        <MetadataItem icon={UserIcon} label="Логін">
          <span>{user.username}</span>
        </MetadataItem>

        <MetadataItem icon={Shield} label="Роль">
          {user.role ? (
            <Badge variant="secondary">{getRoleLabel(user.role)}</Badge>
          ) : (
            <span>—</span>
          )}
        </MetadataItem>

        {user.telegram && (
          <MetadataItem icon={Send} label="Telegram">
            <span>{user.telegram}</span>
          </MetadataItem>
        )}

        {user.photo && (
          <MetadataItem icon={Image} label="Фото">
            <a
              href={user.photo}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("text-primary inline-flex items-center gap-1 hover:underline", typography.body)}
            >
              <ExternalLink className={iconSize.ui} />
              Відкрити в новій вкладці
            </a>
          </MetadataItem>
        )}
      </CardContent>

      <Separator />

      <CardFooter className={cn("flex flex-wrap gap-x-6 gap-y-1 border-t-0 p-6 pt-4", typography.detailSubtitle)}>
        <span className={cn("flex items-center gap-1.5", typography.body)}>
          <Calendar className={iconSize.ui} />
          Створено: {formatDate(user.createdAt)}
        </span>
        <span className={cn("flex items-center gap-1.5", typography.body)}>
          <Calendar className={iconSize.ui} />
          Оновлено: {formatDate(user.updatedAt)}
        </span>
      </CardFooter>
    </DetailPanelCard>
  );
}
