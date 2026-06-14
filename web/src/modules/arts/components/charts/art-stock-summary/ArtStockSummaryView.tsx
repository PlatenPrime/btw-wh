import { cn } from "@/lib/utils";
import type { ArtStockChartSummary } from "@/modules/arts/api/types/art-reports";
import { ArtMetricCard } from "@/modules/arts/components/charts/art-metric-card";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface ArtStockSummaryViewProps {
  summary: ArtStockChartSummary;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("uk-UA", {
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number | null): string {
  if (value === null) return "—";
  return `${value > 0 ? "+" : ""}${formatNumber(value)}%`;
}

function DiffIndicator({ value }: { value: number | null }) {
  if (value === null) return <Minus className="h-4 w-4 text-muted-foreground" />;
  if (value > 0) return <ArrowUp className="h-4 w-4 text-success" />;
  if (value < 0) return <ArrowDown className="h-4 w-4 text-destructive" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}

function getDiffColor(value: number | null): string {
  if (value === null) return "text-muted-foreground";
  if (value > 0) return "text-success";
  if (value < 0) return "text-destructive";
  return "text-muted-foreground";
}

export function ArtStockSummaryView({ summary }: ArtStockSummaryViewProps) {
  return (
    <ArtMetricCard className="self-start">
      <div className="flex items-center gap-2">
        <DiffIndicator value={summary.diffQuantityPct} />
        <div className="grid gap-0.5">
          <span
            className={cn(
              "text-sm font-medium",
              getDiffColor(summary.diffQuantity),
            )}
          >
            {summary.diffQuantity > 0 ? "+" : ""}
            {formatNumber(summary.diffQuantity)} шт
          </span>
          <span
            className={cn("text-xs", getDiffColor(summary.diffQuantityPct))}
          >
            {formatPercent(summary.diffQuantityPct)}
          </span>
        </div>
      </div>
    </ArtMetricCard>
  );
}
