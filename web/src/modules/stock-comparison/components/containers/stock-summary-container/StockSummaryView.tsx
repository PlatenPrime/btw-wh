import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { StockComparisonSummary } from "@/modules/stock-comparison/api/types";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface StockSummaryViewProps {
  summary: StockComparisonSummary;
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
  if (value > 0) return <ArrowUp className="h-4 w-4 text-emerald-500" />;
  if (value < 0) return <ArrowDown className="h-4 w-4 text-red-500" />;
  return <Minus className="h-4 w-4 text-muted-foreground" />;
}

function getDiffColor(value: number | null): string {
  if (value === null) return "text-muted-foreground";
  if (value > 0) return "text-emerald-600 dark:text-emerald-400";
  if (value < 0) return "text-red-600 dark:text-red-400";
  return "text-muted-foreground";
}

interface StockSummaryCardProps {
  title: string;
  firstDayValue: string;
  lastDayValue: string;
  diffValue: string;
  diffPct: string;
  diffNumeric: number;
  diffPctNumeric: number | null;
}

function StockSummaryCard({
  title,
  firstDayValue,
  lastDayValue,
  diffValue,
  diffPct,
  diffNumeric,
  diffPctNumeric,
}: StockSummaryCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Початок періоду</span>
          <span className="text-sm font-semibold">{firstDayValue}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Кінець періоду</span>
          <span className="text-sm font-semibold">{lastDayValue}</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Зміна</span>
            <div className="flex items-center gap-1.5">
              <DiffIndicator value={diffNumeric} />
              <span className={cn("text-sm font-semibold", getDiffColor(diffNumeric))}>
                {diffValue}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-muted-foreground text-sm">Зміна, %</span>
            <span className={cn("text-sm font-semibold", getDiffColor(diffPctNumeric))}>
              {diffPct}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function StockSummaryView({ summary }: StockSummaryViewProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <StockSummaryCard
        title="Залишки конкурента (шт)"
        firstDayValue={`${formatNumber(summary.firstDayCompetitorStock)} шт`}
        lastDayValue={`${formatNumber(summary.lastDayCompetitorStock)} шт`}
        diffValue={`${summary.diffCompetitorStock > 0 ? "+" : ""}${formatNumber(summary.diffCompetitorStock)} шт`}
        diffPct={formatPercent(summary.diffCompetitorStockPct)}
        diffNumeric={summary.diffCompetitorStock}
        diffPctNumeric={summary.diffCompetitorStockPct}
      />
      <StockSummaryCard
        title="Залишки Btrade (шт)"
        firstDayValue={`${formatNumber(summary.firstDayBtradeStock)} шт`}
        lastDayValue={`${formatNumber(summary.lastDayBtradeStock)} шт`}
        diffValue={`${summary.diffBtradeStock > 0 ? "+" : ""}${formatNumber(summary.diffBtradeStock)} шт`}
        diffPct={formatPercent(summary.diffBtradeStockPct)}
        diffNumeric={summary.diffBtradeStock}
        diffPctNumeric={summary.diffBtradeStockPct}
      />
    </div>
  );
}
