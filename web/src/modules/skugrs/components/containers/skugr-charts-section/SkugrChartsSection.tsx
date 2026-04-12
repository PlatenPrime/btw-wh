import {
  getChartDateRangeForLastDays,
  normalizeChartDateRangeOrder,
} from "@/lib/chart-date-range";
import type {
  AnalogSalesRangeItem,
  AnalogSliceRangeItem,
} from "@/modules/analogs/api/types";
import { useSkugrDailySummaryQuery } from "@/modules/skugrs/api/hooks/queries/useSkugrDailySummaryQuery";
import { SkugrChartsSectionView } from "@/modules/skugrs/components/containers/skugr-charts-section/SkugrChartsSectionView";
import { useCallback, useMemo, useState } from "react";

interface SkugrChartsSectionProps {
  skugrId: string;
}

export function SkugrChartsSection({ skugrId }: SkugrChartsSectionProps) {
  const [{ dateFrom, dateTo }, setDateRange] = useState(() =>
    getChartDateRangeForLastDays(14),
  );
  const [showSales, setShowSales] = useState(true);
  const [showRevenue, setShowRevenue] = useState(true);

  const onDateRangeChange = useCallback((from: string, to: string) => {
    setDateRange(normalizeChartDateRangeOrder(from, to));
  }, []);

  const { data, isLoading, isFetching, error, refetch } =
    useSkugrDailySummaryQuery({
      skugrId,
      dateFrom,
      dateTo,
    });

  const sliceItems = useMemo((): AnalogSliceRangeItem[] => {
    const rows = data?.data ?? [];
    return rows.map((row) => ({
      date: row.date,
      stock: row.stock,
      price: 0,
    }));
  }, [data?.data]);

  const salesItems = useMemo((): AnalogSalesRangeItem[] => {
    const rows = data?.data ?? [];
    return rows.map((row) => ({
      date: row.date,
      sales: row.sales,
      revenue: row.revenue,
      price: 0,
      isDeliveryDay: false,
    }));
  }, [data?.data]);

  const toolbar = {
    dateFrom,
    dateTo,
    onDateRangeChange,
  } as const;

  if (isLoading && !data) {
    return <SkugrChartsSectionView {...toolbar} phase="loading" />;
  }

  if (error && !data) {
    return (
      <SkugrChartsSectionView
        {...toolbar}
        phase="error"
        error={error}
        onRetry={() => void refetch()}
      />
    );
  }

  if (!sliceItems.length) {
    return <SkugrChartsSectionView {...toolbar} phase="empty" />;
  }

  const showSalesChart = showSales || showRevenue;

  return (
    <SkugrChartsSectionView
      {...toolbar}
      phase="ready"
      sliceItems={sliceItems}
      salesItems={salesItems}
      showSales={showSales}
      onShowSalesChange={setShowSales}
      showRevenue={showRevenue}
      onShowRevenueChange={setShowRevenue}
      showSalesChart={showSalesChart}
      isFetching={isFetching}
      isLoading={isLoading}
    />
  );
}
