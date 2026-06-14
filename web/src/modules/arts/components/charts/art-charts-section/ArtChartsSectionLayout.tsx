import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { ChartSection } from "@/components/shared/charts/chart-section/ChartSection";
import type { ReactNode } from "react";

export interface ArtChartsSectionLayoutProps {
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
  stockChart: ReactNode;
  salesChart: ReactNode;
}

export function ArtChartsSectionLayout({
  dateFrom,
  dateTo,
  onDateRangeChange,
  stockChart,
  salesChart,
}: ArtChartsSectionLayoutProps) {
  return (
    <div className="grid gap-3">
      <ChartDateRangeToolbar
        idPrefix="art-charts"
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateRangeChange={onDateRangeChange}
      />
      <div className="grid grid-cols-1 items-stretch gap-2 lg:grid-cols-2">
        <ChartSection title="Динаміка залишків" className="h-full">
          {stockChart}
        </ChartSection>
        <ChartSection title="Динаміка продаж" className="h-full">
          {salesChart}
        </ChartSection>
      </div>
    </div>
  );
}
