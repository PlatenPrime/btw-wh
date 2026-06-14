import type { ArtSalesChartSummary } from "@/modules/arts/api/types/art-reports";
import { ArtMetricCard } from "@/modules/arts/components/charts/art-metric-card";

interface ArtSalesSummaryViewProps {
  summary: ArtSalesChartSummary;
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat("uk-UA", {
    maximumFractionDigits: 2,
  }).format(value);
}

interface SummaryCardProps {
  value: string;
}

function SummaryCard({ value }: SummaryCardProps) {
  return (
    <ArtMetricCard>
      <span className="text-lg font-semibold">{value}</span>
    </ArtMetricCard>
  );
}

export function ArtSalesSummaryView({ summary }: ArtSalesSummaryViewProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:items-stretch">
      <SummaryCard value={`${formatNumber(summary.totalSales)} шт`} />
      <SummaryCard value={`${formatNumber(summary.totalRevenue)} грн`} />
    </div>
  );
}
