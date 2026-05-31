import { SummaryField } from "@/components/shared/elements/summary-field";
import { cn } from "@/lib/utils";
import { BtradeArtDataPanel } from "@/modules/arts/components/elements/btrade-art-data-panel";

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
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {hasQuant ? <SummaryField label="Кількість" value={quant} /> : null}
            {hasCom ? (
              <SummaryField
                label="Коментар"
                value={com}
                valueClassName="font-normal"
                className="col-span-2"
              />
            ) : null}
          </div>
        </div>
      ) : null}

      <BtradeArtDataPanel artikul={artikul} />
    </div>
  );
}
