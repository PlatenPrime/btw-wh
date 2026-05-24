import { DetailPanelCard } from "@/components/shared/cards";
import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { UserAvatarName } from "@/components/shared/user/UserAvatarName";
import { CardContent } from "@/components/ui/card";
import { sklads, type ISklads } from "@/constants/sklad";
import { cn } from "@/lib/utils";
import { ArtDialogImage } from "@/modules/arts/components/dialogs/art-dialog-image/ArtDialogImage";
import { BtradeArtDataFetcher } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskDetailsBtradeContainer } from "@/modules/asks/components/cards/ask-details-card/AskDetailsBtradeContainer";
import { AskDetailsBtradeSkeleton } from "@/modules/asks/components/cards/ask-details-card/AskDetailsBtradeSkeleton";
import { AskDetailsSummaryField } from "@/modules/asks/components/cards/ask-details-card/AskDetailsSummaryField";
import { AskStatusBage } from "@/modules/asks/components/elements/ask-status-bage/AskStatusBage";
import { MapPin, Warehouse } from "lucide-react";
import { Link } from "react-router-dom";

interface AskDetailsCardViewProps {
  askData: AskDto;
}

export function AskDetailsCardView({ askData }: AskDetailsCardViewProps) {
  const productName = askData.nameukr
    ? askData.nameukr.slice(10)
    : askData.artikul;
  const skladLabel = askData.sklad
    ? sklads[askData.sklad as keyof ISklads] || askData.sklad
    : null;

  const hasLocation = Boolean(skladLabel || askData.zone);
  const hasRequester = Boolean(
    askData.askerData?.fullname || askData.createdAt,
  );
  const hasRequestDetails = Boolean(askData.quant || askData.com);

  return (
    <DetailPanelCard className="gap-0 overflow-hidden p-0">
      <CardContent className="grid gap-0 p-0">
        {/* Товар + статус */}
        <div className="flex items-start justify-between gap-3 p-4">
          <div className="flex min-w-0 flex-1 items-start gap-3">
            <div className="border-border/60 bg-muted ring-border/40 flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border ring-1 [&_img]:size-12">
              <ArtDialogImage artikul={askData.artikul} />
            </div>
            <div className="grid min-w-0 flex-1 gap-1">
              <Link
                to={`/arts/${askData.artikul}`}
                className="text-sm font-semibold tracking-tight hover:underline"
              >
                {askData.artikul}
              </Link>
              <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                {productName}
              </p>
            </div>
          </div>
          <AskStatusBage statusText={askData.status} />
        </div>

        {/* Автор + дата */}
        {hasRequester ? (
          <div className="border-border/40 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-t px-4 py-2.5 text-sm">
            {askData.askerData?.fullname ? (
              <UserAvatarName
                photoUrl={askData.askerData?.photo}
                fullname={askData.askerData.fullname}
                size="xs"
              />
            ) : null}
            {askData.createdAt ? (
              <CalendarDate date={askData.createdAt} />
            ) : null}
          </div>
        ) : null}

        {/* Локація: чипи */}
        {hasLocation ? (
          <div className="border-border/40 flex flex-wrap items-center gap-2 border-t px-4 py-2.5">
            {skladLabel ? (
              <span className="bg-muted/60 text-foreground inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium">
                <Warehouse className="text-muted-foreground size-4 shrink-0" />
                {skladLabel}
              </span>
            ) : null}
            {askData.zone ? (
              <span className="bg-muted/60 text-foreground inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium">
                <MapPin className="text-warning size-4 shrink-0" />
                {askData.zone}
              </span>
            ) : null}
          </div>
        ) : null}

        {/* Дані: заявка + sharik.ua */}
        <div
          className={cn(
            "border-border/40 grid gap-3 border-t p-4",
            hasRequestDetails ? "sm:grid-cols-2" : "",
          )}
        >
          {hasRequestDetails ? (
            <div className="bg-muted/30 grid gap-2.5 rounded-lg p-3">
              <span className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                Заявка
              </span>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {askData.quant ? (
                  <AskDetailsSummaryField
                    label="Кількість"
                    value={askData.quant}
                  />
                ) : null}
                {askData.com ? (
                  <AskDetailsSummaryField
                    label="Коментар"
                    value={askData.com}
                    valueClassName="font-normal"
                    className="col-span-2"
                  />
                ) : null}
              </div>
            </div>
          ) : null}

          <div className="bg-muted/30 grid gap-2.5 rounded-lg p-3">
            <span className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
              Sharik.ua
            </span>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
              <BtradeArtDataFetcher
                artikul={askData.artikul}
                ContainerComponent={AskDetailsBtradeContainer}
                SkeletonComponent={AskDetailsBtradeSkeleton}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </DetailPanelCard>
  );
}
