import {
  IconWell,
  type IconWellTone,
} from "@/components/shared/elements";
import { typography, iconSize } from "@/lib/typography";
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
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
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
  icon,
  label,
  tone = "muted",
  children,
}: {
  icon: LucideIcon;
  label: string;
  tone?: IconWellTone;
  children: ReactNode;
}) {
  return (
    <div className="flex items-start gap-2">
      <IconWell icon={icon} tone={tone} size="sm" />
      <div className="grid min-w-0 gap-1">
        <span className={typography.detailSubtitle}>{label}</span>
        {children}
      </div>
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
        <MetadataItem icon={UserIcon} tone="primary" label="Логін">
          <span>{user.username}</span>
        </MetadataItem>

        <MetadataItem icon={Shield} tone="info" label="Роль">
          {user.role ? (
            <Badge variant="secondary">{getRoleLabel(user.role)}</Badge>
          ) : (
            <span>—</span>
          )}
        </MetadataItem>

        {user.telegram && (
          <MetadataItem icon={Send} tone="edit" label="Telegram">
            <span>{user.telegram}</span>
          </MetadataItem>
        )}

        {user.photo && (
          <MetadataItem icon={Image} tone="muted" label="Фото">
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
          <IconWell icon={Calendar} tone="muted" size="sm" />
          Створено: {formatDate(user.createdAt)}
        </span>
        <span className={cn("flex items-center gap-1.5", typography.body)}>
          <IconWell icon={Calendar} tone="muted" size="sm" />
          Оновлено: {formatDate(user.updatedAt)}
        </span>
      </CardFooter>
    </DetailPanelCard>
  );
}
