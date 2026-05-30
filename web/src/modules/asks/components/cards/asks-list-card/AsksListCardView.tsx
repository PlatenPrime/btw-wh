import { ListRowCard } from "@/components/shared/cards";
import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { UserAvatarName } from "@/components/shared/user/UserAvatarName";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import type { AskDto, AskStatus } from "@/modules/asks/api/types/dto";
import { AskStatusBage } from "@/modules/asks/components/elements/ask-status-bage/AskStatusBage";
import { Link } from "react-router-dom";
import { AskCom } from "../../elements/ask-com/AskCom";
import { AskQuant } from "../../elements/ask-quant/AskQuant";

interface AsksListCardViewProps {
  ask: AskDto;
  statusText: AskStatus;
}

export function AsksListCardView({ ask, statusText }: AsksListCardViewProps) {
  const productName = ask.nameukr ? ask.nameukr.slice(10) : ask.artikul;
  const hasDetails = Boolean(ask.quant || ask.com);

  return (
    <ListRowCard className="group hover:bg-muted/30 grid gap-3 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <ArtDialogImage artikul={ask.artikul} />

          <Link
            to={ask._id}
            className="grid min-w-0 flex-1 gap-1 hover:underline"
          >
            <span className="text-base font-semibold tracking-tight">
              {ask.artikul}
            </span>
            <span className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {productName}
            </span>
          </Link>
        </div>
        <div className="shrink-0">
          <AskStatusBage statusText={statusText} />
        </div>
      </div>

      {hasDetails ? (
        <div className="grid">
          <AskQuant quant={ask.quant || 0} />
          <AskCom com={ask.com || ""} />
        </div>
      ) : null}

      <div className="border-border/40 flex flex-wrap items-center justify-between gap-2 border-t pt-2">
        <UserAvatarName
          photoUrl={ask.askerData?.photo}
          fullname={ask.askerData?.fullname}
          className="text-sm"
          size="xs"
        />
        <CalendarDate date={ask.createdAt} />
      </div>
    </ListRowCard>
  );
}
