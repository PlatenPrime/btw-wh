import { iconSize, typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { ArrowDownToLine, MapPin } from "lucide-react";
import type { ReactNode } from "react";

interface AskPullPositionCardViewProps {
  artZone: string | null;
  plannedQuant: number | null;
  children: ReactNode;
}

export function AskPullPositionCardView({
  artZone,
  plannedQuant,
  children,
}: AskPullPositionCardViewProps) {
  const zoneLabel = artZone ?? "—";

  return (
    <div className="flex flex-col gap-1.5">
      <div
        className={cn(
          "text-foreground flex flex-wrap items-center gap-3 px-1",
          typography.body,
        )}
      >
        <span className="inline-flex min-w-0 items-center gap-1.5">
          <MapPin className={cn(iconSize.inline, "text-warning shrink-0")} />
          <span className="truncate">{zoneLabel}</span>
        </span>
        {plannedQuant !== null ? (
          <span
            className="inline-flex items-center gap-1"
            title="Зняти"
            aria-label={`Зняти: ${plannedQuant}`}
          >
            <ArrowDownToLine
              className={cn(iconSize.inline, "text-success")}
              aria-hidden
            />
            {plannedQuant}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}
