import { typography } from "@/lib/typography";
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
      <span className={typography.metric}>{value}</span>
    </ArtMetricCard>
  );
}

export function ArtSalesSummaryView({ summary }: ArtSalesSummaryViewProps) {
  return (
    <div className="flex flex-wrap items-start gap-3">
      <SummaryCard value={`${formatNumber(summary.totalSales)} шт`} />
      <SummaryCard value={`${formatNumber(summary.totalRevenue)} грн`} />
    </div>
  );
}
