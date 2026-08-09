import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { SkuStatisticsProdControlsView } from "@/modules/sku-analytics/components/controls/sku-statistics-prod-controls/SkuStatisticsProdControlsView";
import { SKU_KONK_PROD_QUERY_ALL } from "@/modules/sku-analytics/constants";

export interface SkuStatisticsProdControlsProps {
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
  onKonkChange: (value: string) => void;
  onProdChange: (value: string) => void;
  onDateRangeChange: (from: string, to: string) => void;
}

export function SkuStatisticsProdControls({
  konk,
  prod,
  dateFrom,
  dateTo,
  onKonkChange,
  onProdChange,
  onDateRangeChange,
}: SkuStatisticsProdControlsProps) {
  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();
  const konks = konksQuery.data?.data ?? [];
  const prods = (prodsQuery.data?.data ?? []).filter(
    (p) => p.name !== SKU_KONK_PROD_QUERY_ALL,
  );

  return (
    <SkuStatisticsProdControlsView
      konk={konk}
      prod={prod}
      dateFrom={dateFrom}
      dateTo={dateTo}
      konks={konks}
      prods={prods}
      onKonkChange={onKonkChange}
      onProdChange={onProdChange}
      onDateRangeChange={onDateRangeChange}
    />
  );
}
