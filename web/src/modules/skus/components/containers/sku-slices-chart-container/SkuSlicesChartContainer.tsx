import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { SliceRangeChartSkeleton } from "@/components/shared/charts/slice-range-chart";
import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { useSkuSliceRangeQuery } from "@/modules/skus/api/hooks/queries/useSkuSliceRangeQuery";
import { PatchSkuSliceDialog } from "@/modules/skus/components/dialogs/patch-sku-slice-dialog";
import type { SliceRangeChartPoint } from "@/types/charts-range";
import { useMemo, useState } from "react";
import { SkuSlicesChartContainerView } from "./SkuSlicesChartContainerView";

interface SkuSlicesChartContainerProps {
  skuId: string | undefined;
  skuTitle: string;
  dateFrom: string;
  dateTo: string;
}

export function SkuSlicesChartContainer({
  skuId,
  skuTitle,
  dateFrom,
  dateTo,
}: SkuSlicesChartContainerProps) {
  const { hasRole } = useAuth();
  const canPatchSlice = hasRole(RoleType.ADMIN);
  const [showStock, setShowStock] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [patchDialogOpen, setPatchDialogOpen] = useState(false);

  const { data, isLoading, isFetching, error, refetch } = useSkuSliceRangeQuery({
    skuId,
    dateFrom,
    dateTo,
  });

  const patchInitialValues = useMemo(
    () => ({
      mode: "period" as const,
      dateFrom,
      dateTo,
    }),
    [dateFrom, dateTo],
  );

  if (!skuId) {
    return (
      <LoadingNoData description="Ідентифікатор товару не передано для завантаження історії залишків та цін" />
    );
  }

  if (isLoading && !data) {
    return <SliceRangeChartSkeleton />;
  }

  if (error && !data) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження історії залишків та цін"
        description="Не вдалося завантажити дані для побудови графіка"
        onRetry={() => void refetch()}
        variant="compact"
      />
    );
  }

  const items = (data?.data ?? []) as SliceRangeChartPoint[];
  if (!items.length) {
    return (
      <LoadingNoData description="Немає даних про залишки та ціни за обраний період" />
    );
  }

  return (
    <>
      <SkuSlicesChartContainerView
        items={items}
        showStock={showStock}
        showPrice={showPrice}
        onShowStockChange={setShowStock}
        onShowPriceChange={setShowPrice}
        isFetching={isFetching}
        isLoading={isLoading}
        canPatchSlice={canPatchSlice}
        onPatchSlice={() => setPatchDialogOpen(true)}
      />
      {canPatchSlice ? (
        <PatchSkuSliceDialog
          key={`${skuId}-${dateFrom}-${dateTo}`}
          skuId={skuId}
          skuTitle={skuTitle}
          open={patchDialogOpen}
          onOpenChange={setPatchDialogOpen}
          initialValues={patchInitialValues}
        />
      ) : null}
    </>
  );
}
