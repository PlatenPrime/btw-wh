import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { CardActionsMenu } from "@/components/shared/card-actions";
import type { CardAction } from "@/components/shared/card-actions/types";
import { CalendarDate } from "@/components/shared/date/CalendarDate";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <Card className="grid gap-2 p-2 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-out hover:bg-muted-foreground/5 hover:shadow-lg dark:ring-gray-700">
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
              variant="ghost"
              size="icon"
              disabled={isMenuDisabled}
              className="hover:bg-muted h-6 w-6 shrink-0 p-0"
            >
              <MoreHorizontal className="h-3 w-3" />
              <span className="sr-only">Відкрити меню дій</span>
            </Button>
          }
        />
      </div>
      <div className="grid gap-2 pl-12">
        {kask.quant != null ? (
          <div className="text-foreground flex items-center gap-2 text-sm">
            <CircleIcon className="h-4 w-4 shrink-0" />
            <span>{kask.quant}</span>
          </div>
        ) : null}
        <div className="text-foreground flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{kask.zone}</span>
        </div>
        {comText ? (
          <div className="text-foreground flex items-start gap-2 text-sm">
            <MessageSquareMore className="mt-0.5 h-4 w-4 shrink-0" />
            <span className="italic">{comText}</span>
          </div>
        ) : null}
        <CalendarDate date={kask.createdAt} />
      </div>
    </Card>
  );
}
