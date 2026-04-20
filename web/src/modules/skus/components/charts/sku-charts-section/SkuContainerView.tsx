import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import type { SkuDto } from "@/modules/skus/api/types";
import { SkuDetailCard } from "@/modules/skus/components/cards/sku-detail-card/SkuDetailCard";
import { SkuChartsSection } from "@/modules/skus/components/charts/sku-charts-section/SkuChartsSection";

interface SkuContainerViewProps {
  sku: SkuDto;
  konk: KonkDto | undefined;
  prod: ProdDto | undefined;
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
}

export function SkuContainerView({
  sku,
  konk,
  prod,
  dateFrom,
  dateTo,
  onDateRangeChange,
}: SkuContainerViewProps) {
  return (
    <div className="grid gap-2">
      <SkuDetailCard sku={sku} konk={konk} prod={prod} />
      <SkuChartsSection
        skuId={sku._id}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateRangeChange={onDateRangeChange}
      />
    </div>
  );
}
