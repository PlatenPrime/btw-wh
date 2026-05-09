import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkuDetailDto, SkuSkugrDto } from "@/modules/skus/api/types";
import { SkuDetailCard } from "@/modules/skus/components/cards/sku-detail-card/SkuDetailCard";
import { SkuChartsSectionLayout } from "@/modules/skus/components/charts/sku-charts-section/SkuChartsSectionLayout";
import { SkuSalesChartContainer } from "@/modules/skus/components/containers/sku-sales-chart-container";
import { SkuSlicesChartContainer } from "@/modules/skus/components/containers/sku-slices-chart-container";

export interface SkuContainerViewProps {
  sku: SkuDetailDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
  skugrs: SkuSkugrDto[];
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
}

export function SkuContainerView({
  sku,
  konk,
  prod,
  skugrs,
  dateFrom,
  dateTo,
  onDateRangeChange,
}: SkuContainerViewProps) {
  return (
    <div className="grid gap-2">
      <SkuDetailCard sku={sku} konk={konk} prod={prod} skugrs={skugrs} />
      <SkuChartsSectionLayout
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateRangeChange={onDateRangeChange}
        slicesChart={
          <SkuSlicesChartContainer
            skuId={sku._id}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
        }
        salesChart={
          <SkuSalesChartContainer
            skuId={sku._id}
            dateFrom={dateFrom}
            dateTo={dateTo}
          />
        }
      />
    </div>
  );
}
