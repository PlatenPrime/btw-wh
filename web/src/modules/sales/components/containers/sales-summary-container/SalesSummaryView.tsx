import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { SalesComparisonSummary } from "@/modules/sales/api/types";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

interface SalesSummaryViewProps {
  summary: SalesComparisonSummary;
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

interface SummaryCardProps {
  title: string;
  competitorValue: string;
  btradeValue: string;
  diffValue: string;
  diffPct: string;
  diffNumeric: number | null;
}

function SummaryCard({
  title,
  competitorValue,
  btradeValue,
  diffValue,
  diffPct,
  diffNumeric,
}: SummaryCardProps) {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Конкурент</span>
          <span className="text-sm font-semibold">{competitorValue}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground text-sm">Btrade</span>
          <span className="text-sm font-semibold">{btradeValue}</span>
        </div>
        <div className="border-t pt-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">Різниця</span>
            <div className="flex items-center gap-1.5">
              <DiffIndicator value={diffNumeric} />
              <span className={cn("text-sm font-semibold", getDiffColor(diffNumeric))}>
                {diffValue}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-muted-foreground text-sm">Різниця, %</span>
            <span className={cn("text-sm font-semibold", getDiffColor(diffNumeric))}>
              {diffPct}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SalesSummaryView({ summary }: SalesSummaryViewProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <SummaryCard
        title="Продажі (шт)"
        competitorValue={`${formatNumber(summary.totalCompetitorSales)} шт`}
        btradeValue={`${formatNumber(summary.totalBtradeSales)} шт`}
        diffValue={`${summary.diffSalesPcs > 0 ? "+" : ""}${formatNumber(summary.diffSalesPcs)} шт`}
        diffPct={formatPercent(summary.diffSalesPct)}
        diffNumeric={summary.diffSalesPcs}
      />
      <SummaryCard
        title="Виручка (грн)"
        competitorValue={`${formatNumber(summary.totalCompetitorRevenue)} грн`}
        btradeValue={`${formatNumber(summary.totalBtradeRevenue)} грн`}
        diffValue={`${summary.diffRevenueUah > 0 ? "+" : ""}${formatNumber(summary.diffRevenueUah)} грн`}
        diffPct={formatPercent(summary.diffRevenuePct)}
        diffNumeric={summary.diffRevenueUah}
      />
    </div>
  );
}
