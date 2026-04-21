import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
        <Card className="overflow-hidden shadow-md">
          <CardHeader className="pb-2">
            <h3 className="text-muted-foreground text-sm font-medium">
              Динаміка залишків та ціни
            </h3>
          </CardHeader>
          <CardContent>{slicesChart}</CardContent>
        </Card>
        <Card className="overflow-hidden shadow-md">
          <CardHeader className="pb-2">
            <h3 className="text-muted-foreground text-sm font-medium">
              Динаміка продаж
            </h3>
          </CardHeader>
          <CardContent>{salesChart}</CardContent>
        </Card>
      </div>
    </div>
  );
}
