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
    <ListRowCard
      className={cn(
        "group relative grid gap-3 overflow-hidden border-l-4",
      )}
      style={{
        borderLeftColor:
          "color-mix(in oklch, var(--chart-6) 55%, var(--primary))",
      }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none"
        style={{
          background:
            "linear-gradient(120deg, color-mix(in oklch, var(--chart-6) 10%, transparent), color-mix(in oklch, var(--primary) 8%, transparent))",
        }}
      />
      <div className="relative flex items-start gap-2">
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

      {comText ? (
        <div
          className={cn(
            "text-foreground relative flex items-start gap-2",
            typography.body,
          )}
        >
          <IconWell icon={MessageSquareMore} tone="edit" size="sm" />
          <span className="italic">{comText}</span>
        </div>
      ) : null}

      <div className="border-border/40 relative flex flex-wrap items-center justify-between gap-2 border-t pt-2">
        <div className="flex flex-wrap items-center gap-3">
          {kask.quant != null ? (
            <div
              className={cn(
                "text-foreground flex items-center gap-2",
                typography.body,
              )}
            >
              <IconWell icon={CircleIcon} tone="info" size="sm" />
              <span>{kask.quant}</span>
            </div>
          ) : null}
          <div
            className={cn(
              "text-foreground flex items-center gap-2",
              typography.body,
            )}
          >
            <IconWell icon={MapPin} tone="warning" size="sm" />
            <span>{kask.zone}</span>
          </div>
        </div>
        <CalendarDate date={kask.createdAt} />
      </div>
    </ListRowCard>
  );
}
