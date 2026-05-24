import { ListRowCard } from "@/components/shared/cards";
import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { UserAvatarName } from "@/components/shared/user/UserAvatarName";
import { cn } from "@/lib/utils";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import type { AskDto, AskStatus } from "@/modules/asks/api/types/dto";
import { AskStatusBage } from "@/modules/asks/components/elements/ask-status-bage/AskStatusBage";
import { Link } from "react-router-dom";
import { AskCom } from "../../elements/ask-com/AskCom";
import { AskQuant } from "../../elements/ask-quant/AskQuant";
import { AskSklad } from "../../elements/ask-sklad/AskSklad";

interface AsksListCardViewProps {
  ask: AskDto;
  statusText: AskStatus;
}

export function AsksListCardView({ ask, statusText }: AsksListCardViewProps) {
  const productName = ask.nameukr ? ask.nameukr.slice(10) : ask.artikul;
  const hasDetails = Boolean(ask.quant || ask.com || ask.sklad);

  return (
    <ListRowCard className="group hover:bg-muted/30 grid gap-3 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div className="border-border/60 bg-muted ring-border/40 flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border ring-1">
            <ArtDialogImage artikul={ask.artikul} />
          </div>
          <Link
            to={ask._id}
            className="grid min-w-0 flex-1 gap-1 hover:underline"
          >
            <span className="text-sm font-semibold tracking-tight">
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
        <div
          className={cn(
            "border-border/50 bg-muted/15 gap-2 rounded-lg border p-2.5 sm:flex sm:justify-between",
          )}
        >
          <div className="grid gap-2 sm:content-start">
            <AskSklad sklad={ask.sklad} />
          </div>
          <div className="grid">
            <AskQuant quant={ask.quant || 0} />
            <AskCom com={ask.com || ""} />
          </div>
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
