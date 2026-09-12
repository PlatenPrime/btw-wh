import { ListRowCard } from "@/components/shared/cards";
import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { CalendarDate } from "@/components/shared/date/calendar-date/CalendarDate";
import { UserAvatarName } from "@/components/shared/entities/user/UserAvatarName";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import type { AskDto, AskStatus } from "@/modules/asks/api/types/dto";
import { AskStatusBage } from "@/modules/asks/components/elements/ask-status-bage/AskStatusBage";
import { Link, useSearchParams } from "react-router";
import { AskCom } from "../../elements/ask-com/AskCom";
import { AskQuant } from "../../elements/ask-quant/AskQuant";

interface AsksListCardViewProps {
  ask: AskDto;
  statusText: AskStatus;
}

export function AsksListCardView({ ask, statusText }: AsksListCardViewProps) {
  const [searchParams] = useSearchParams();
  const productName = ask.nameukr ? ask.nameukr.slice(10) : ask.artikul;
  const hasDetails = Boolean(ask.quant || ask.com);

  return (
    <ListRowCard className="group grid gap-3 hover:bg-muted/30">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <ArtDialogImage artikul={ask.artikul} />

          <Link
            to={{ pathname: ask._id, search: searchParams.toString() }}
            className="grid min-w-0 flex-1 gap-1 hover:underline"
          >
            <span className={typography.listTitleEmphasized}>{ask.artikul}</span>
            <span className={cn("line-clamp-2", typography.listSubtitleEmphasized)}>
              {productName}
            </span>
          </Link>
        </div>
        <div className="shrink-0">
          <AskStatusBage statusText={statusText} />
        </div>
      </div>

      {hasDetails ? (
        <div className="grid gap-2">
          <AskQuant quant={ask.quant || 0} />
          <AskCom com={ask.com || ""} />
        </div>
      ) : null}

      <div className="border-border/40 flex flex-wrap items-center justify-between gap-2 border-t pt-2">
        <UserAvatarName
          photoUrl={ask.askerData?.photo}
          fullname={ask.askerData?.fullname}
          className={typography.body}
          size="xs"
        />
        <CalendarDate date={ask.createdAt} />
      </div>
    </ListRowCard>
  );
}
