import {
  getChartDateRangeForLastDays,
  normalizeChartDateRangeOrder,
} from "@/lib/chart-date-range";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import type { SkuDto } from "@/modules/skus/api/types";
import { SkuDetailHeaderActions } from "@/modules/skus/components/actions/sku-detail-header-actions";
import { SkuContainerView } from "@/modules/skus/components/containers/sku-container/SkuContainerView";
import { useCallback, useMemo, useState } from "react";

interface SkuContainerProps {
  sku: SkuDto;
}

export function SkuContainer({ sku }: SkuContainerProps) {
  const konksQuery = useKonksQuery();
  const prodsQuery = useProdsQuery();

  const [{ dateFrom, dateTo }, setDateRange] = useState(() =>
    getChartDateRangeForLastDays(14),
  );

  const onDateRangeChange = useCallback((from: string, to: string) => {
    setDateRange(normalizeChartDateRangeOrder(from, to));
  }, []);

  const konk = useMemo(() => {
    const konks = konksQuery.data?.data ?? [];
    return konks.find((k) => k.name === sku.konkName);
  }, [konksQuery.data?.data, sku.konkName]);

  const prod = useMemo(() => {
    const prods = prodsQuery.data?.data ?? [];
    return prods.find((p) => p.name === sku.prodName);
  }, [prodsQuery.data?.data, sku.prodName]);

  return (
    <>
      <SkuDetailHeaderActions sku={sku} />
      <SkuContainerView
        sku={sku}
        konk={konk}
        prod={prod}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateRangeChange={onDateRangeChange}
      />
    </>
  );
}
