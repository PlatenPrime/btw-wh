import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { SkuStatisticsSkugrControlsView } from "@/modules/sku-analytics/components/controls/sku-statistics-skugr-controls/SkuStatisticsSkugrControlsView";
import { useMemo } from "react";

export interface SkuStatisticsSkugrControlsProps {
  dateFrom: string;
  dateTo: string;
  onDateRangeChange: (from: string, to: string) => void;
  konk?: string;
  prod?: string;
}

export function SkuStatisticsSkugrControls({
  dateFrom,
  dateTo,
  onDateRangeChange,
  konk,
  prod,
}: SkuStatisticsSkugrControlsProps) {
  const konksQuery = useKonksQuery({ enabled: Boolean(konk) });
  const prodsQuery = useProdsQuery({ enabled: Boolean(prod) });

  const konkEntity = useMemo(() => {
    if (!konk) return undefined;
    return (konksQuery.data?.data ?? []).find((item) => item.name === konk);
  }, [konksQuery.data?.data, konk]);

  const prodEntity = useMemo(() => {
    if (!prod) return undefined;
    return (prodsQuery.data?.data ?? []).find((item) => item.name === prod);
  }, [prodsQuery.data?.data, prod]);

  return (
    <SkuStatisticsSkugrControlsView
      dateFrom={dateFrom}
      dateTo={dateTo}
      onDateRangeChange={onDateRangeChange}
      konkName={konk}
      prodName={prod}
      konkImageUrl={konkEntity?.imageUrl}
      konkTitle={konkEntity?.title}
      prodImageUrl={prodEntity?.imageUrl}
      prodTitle={prodEntity?.title}
    />
  );
}
