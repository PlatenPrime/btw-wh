import { MetricChip } from "@/components/shared/elements";
import { cn } from "@/lib/utils";
import { BtradeArtDataPanel } from "@/modules/arts/components/elements/btrade-art-data-panel";
import { CircleIcon, MessageSquareMore } from "lucide-react";

interface AskDetailsPanelsSectionProps {
  artikul: string;
  quant?: number;
  com?: string;
}

export function AskDetailsPanelsSection({
  artikul,
  quant,
  com,
}: AskDetailsPanelsSectionProps) {
  const hasQuant = Boolean(quant);
  const hasCom = Boolean(com);
  const hasRequestDetails = hasQuant || hasCom;

  return (
    <div
      className={cn(
        "border-border/40 grid gap-3 border-t p-4",
        hasRequestDetails ? "sm:grid-cols-2" : "",
      )}
    >
      {hasRequestDetails ? (
        <div className="bg-muted/30 grid gap-2.5 rounded-lg p-3">
          <span className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
            Запит
          </span>
          <div className="flex flex-wrap gap-2">
            {hasQuant ? (
              <MetricChip
                icon={CircleIcon}
                tone="info"
                label="Кількість"
                value={quant}
              />
            ) : null}
            {hasCom ? (
              <MetricChip
                icon={MessageSquareMore}
                tone="edit"
                label="Коментар"
                value={com}
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <BtradeArtDataPanel artikul={artikul} />
    </div>
  );
}
