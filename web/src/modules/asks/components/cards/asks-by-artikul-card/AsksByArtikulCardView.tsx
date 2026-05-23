import { memo } from "react";
import { ListRowCard } from "@/components/shared/cards";
import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { UserAvatarName } from "@/components/shared/user/UserAvatarName";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskStatusBage } from "@/modules/asks/components/elements/ask-status-bage/AskStatusBage";
import { Link } from "react-router";

interface AsksByArtikulCardViewProps {
  ask: AskDto;
}

export const AsksByArtikulCardView = memo(function AsksByArtikulCardView({
  ask,
}: AsksByArtikulCardViewProps) {
  return (
    <Link to={`/refiling/asks/${ask._id}`} className="block">
      <ListRowCard className="grid gap-2 transition-colors hover:bg-muted/30">
        <div className="flex items-start justify-between gap-2">
          <div className="grid flex-1 gap-2">
            <div className="grid gap-2">
              <CalendarDate date={ask.createdAt} />
              {ask.askerData ? (
                <UserAvatarName
                  photoUrl={ask.askerData.photo}
                  fullname={ask.askerData.fullname}
                  className="text-sm"
                  size="xs"
                />
              ) : null}
            </div>
          </div>
          <div className="shrink-0">
            <AskStatusBage statusText={ask.status} />
          </div>
        </div>
      </ListRowCard>
    </Link>
  );
});
