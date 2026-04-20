import { ChartDateRangeToolbar } from "@/components/shared/chart-date-range-toolbar/ChartDateRangeToolbar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SkuSalesChartContainer } from "@/modules/skus/components/containers/sku-sales-chart-container";
import { SkuSlicesChartContainer } from "@/modules/skus/components/containers/sku-slices-chart-container";

interface SkuChartsSectionProps {
  skuId: string;
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
}

export function SkuChartsSection({
  skuId,
  dateFrom,
  dateTo,
  onDateRangeChange,
}: SkuChartsSectionProps) {
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
          <CardContent>
            <SkuSlicesChartContainer
              skuId={skuId}
              dateFrom={dateFrom}
              dateTo={dateTo}
            />
          </CardContent>
        </Card>
        <Card className="overflow-hidden shadow-md">
          <CardHeader className="pb-2">
            <h3 className="text-muted-foreground text-sm font-medium">
              Динаміка продаж
            </h3>
          </CardHeader>
          <CardContent>
            <SkuSalesChartContainer
              skuId={skuId}
              dateFrom={dateFrom}
              dateTo={dateTo}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
