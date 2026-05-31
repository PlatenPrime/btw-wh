import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { SkuKonkProdChartControlsView } from "@/modules/sku-analytics/components/controls/sku-konk-prod-chart-controls/SkuKonkProdChartControlsView";
import { SKU_KONK_PROD_QUERY_ALL } from "@/modules/sku-analytics/constants";
import { useState } from "react";

export interface SkuKonkProdChartControlsProps {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  skugrIds: string[];
  onKonkChange: (value: string) => void;
  onProdChange: (value: string) => void;
  onDateRangeChange: (from: string, to: string) => void;
  onSkugrIdsChange: (ids: string[]) => void;
}

export function SkuKonkProdChartControls({
  konk,
  prod,
  dateFrom,
  dateTo,
  skugrIds,
  onKonkChange,
  onProdChange,
  onDateRangeChange,
  onSkugrIdsChange,
}: SkuKonkProdChartControlsProps) {
  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = (prodsQuery.data?.data ?? []).filter(
    (p) => p.name !== SKU_KONK_PROD_QUERY_ALL,
  );

  const [isSkugrDialogOpen, setIsSkugrDialogOpen] = useState(false);

  const skugrDialogReady = Boolean(konk);
  const prodNameForSkugrList = prod === SKU_KONK_PROD_QUERY_ALL ? "" : prod;

  return (
    <SkuKonkProdChartControlsView
      konk={konk}
      prod={prod}
      dateFrom={dateFrom}
      dateTo={dateTo}
      skugrIds={skugrIds}
      konks={konks}
      prods={prods}
      onKonkChange={onKonkChange}
      onProdChange={onProdChange}
      onDateRangeChange={onDateRangeChange}
      onSkugrIdsChange={onSkugrIdsChange}
      isSkugrDialogOpen={isSkugrDialogOpen}
      onSkugrDialogOpenChange={setIsSkugrDialogOpen}
      prodNameForSkugrList={prodNameForSkugrList}
      skugrDialogReady={skugrDialogReady}
    />
  );
}
