import { UserAvatarName } from "@/components/shared/entities/user/UserAvatarName";
import { ListRowCard } from "@/components/shared/cards";
import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { typography } from "@/lib/typography";
import type { EventDto } from "@/modules/events/api/types";
import { formatDate } from "@/utils/formatDate";

interface EventRowViewProps {
  event: EventDto;
}

export function EventRowView({ event }: EventRowViewProps) {
  return (
    <ListRowCard>
      <CardContent className="grid gap-2 p-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <UserAvatarName
            photoUrl={event.userData.photo}
            fullname={event.userData.fullname}
            size="sm"
          />
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{event.department}</Badge>
            <span className={typography.caption}>
              {formatDate(event.createdAt)}
            </span>
          </div>
        </div>
        <p className={typography.listSubtitle}>{event.description}</p>
      </CardContent>
    </ListRowCard>
  );
}
