import { typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { ArtikulImageLink } from "@/components/shared/media/artikul-image-link/ArtikulImageLink";
import { CardActionsMenu } from "@/components/shared/actions/card-actions";
import type { CardAction } from "@/components/shared/actions/card-actions";
import { CalendarDate } from "@/components/shared/date/calendar-date/CalendarDate";
import { IconWell } from "@/components/shared/elements";
import { Button } from "@/components/ui/button";
import { ListRowCard } from "@/components/shared/cards";
import type { KaskDto } from "@/modules/kasks/api/types/dto";
import { CircleIcon, MapPin, MessageSquareMore, MoreHorizontal } from "lucide-react";

interface KasksListCardViewProps {
  kask: KaskDto;
  actions: CardAction[];
  isMenuDisabled: boolean;
}

export function KasksListCardView({
  kask,
  actions,
  isMenuDisabled,
}: KasksListCardViewProps) {
  const comText = kask.com?.trim();

  return (
    <ListRowCard className="grid gap-2 hover:bg-muted/30">
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <ArtikulImageLink
            artikul={kask.artikul}
            nameukr={kask.nameukr}
            target="_self"
          />
        </div>
        <CardActionsMenu
          actions={actions}
          orientation="horizontal"
          size="sm"
          align="end"
          trigger={
            <Button
              type="button"
              variant="info-soft"
              size="icon-sm"
              disabled={isMenuDisabled}
              className="shrink-0"
            >
              <MoreHorizontal className="h-3 w-3" />
              <span className="sr-only">Відкрити меню дій</span>
            </Button>
          }
        />
      </div>
      <div className="grid gap-2 pl-12">
        {kask.quant != null ? (
          <div className={cn("text-foreground flex items-center gap-2", typography.body)}>
            <IconWell icon={CircleIcon} tone="info" size="sm" />
            <span>{kask.quant}</span>
          </div>
        ) : null}
        <div className={cn("text-foreground flex items-center gap-2", typography.body)}>
          <IconWell icon={MapPin} tone="warning" size="sm" />
          <span>{kask.zone}</span>
        </div>
        {comText ? (
          <div className={cn("text-foreground flex items-start gap-2", typography.body)}>
            <IconWell icon={MessageSquareMore} tone="edit" size="sm" />
            <span className="italic">{comText}</span>
          </div>
        ) : null}
        <CalendarDate date={kask.createdAt} />
      </div>
    </ListRowCard>
  );
}
