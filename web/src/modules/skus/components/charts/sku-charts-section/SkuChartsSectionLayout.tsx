import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { ChartSection } from "@/components/shared/charts/chart-section/ChartSection";
import type { ReactNode } from "react";

export interface SkuChartsSectionLayoutProps {
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
  slicesChart: ReactNode;
  salesChart: ReactNode;
}

export function SkuChartsSectionLayout({
  dateFrom,
  dateTo,
  onDateRangeChange,
  slicesChart,
  salesChart,
}: SkuChartsSectionLayoutProps) {
  return (
    <div className="grid gap-3">
      <ChartDateRangeToolbar
        idPrefix="sku-charts"
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateRangeChange={onDateRangeChange}
      />
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <ChartSection title="Динаміка залишків та ціни">
          {slicesChart}
        </ChartSection>
        <ChartSection title="Динаміка продаж">{salesChart}</ChartSection>
      </div>
    </div>
  );
}
