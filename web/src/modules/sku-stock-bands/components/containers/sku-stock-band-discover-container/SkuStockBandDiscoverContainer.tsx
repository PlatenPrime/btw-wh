import { RoleType } from "@/constants/roles";
import { useStartApiTask } from "@/modules/apitasks";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import type { DiscoverStockBandPayload } from "@/modules/sku-stock-bands/api/types";
import { SkuStockBandDiscoverContainerView } from "@/modules/sku-stock-bands/components/containers/sku-stock-band-discover-container/SkuStockBandDiscoverContainerView";
import { useCallback, useEffect, useState } from "react";

interface SkuStockBandDiscoverContainerProps {
  data: DiscoverStockBandPayload;
  dateFrom: string;
  dateTo: string;
}

export function SkuStockBandDiscoverContainer({
  data,
  dateFrom,
  dateTo,
}: SkuStockBandDiscoverContainerProps) {
  const { hasRole } = useAuth();
  const canBatch = hasRole(RoleType.ADMIN);
  const { startTask, isStarting } = useStartApiTask();
  const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(
    () => new Set(),
  );

  useEffect(() => {
    setSelectedProductIds(new Set());
  }, [data.bandId, data.window.dateFrom, data.window.dateTo]);

  const handleToggleProductId = useCallback(
    (productId: string, checked: boolean) => {
      setSelectedProductIds((prev) => {
        const next = new Set(prev);
        if (checked) {
          next.add(productId);
        } else {
          next.delete(productId);
        }
        return next;
      });
    },
    [],
  );

  const handleToggleAll = useCallback(
    (checked: boolean) => {
      if (!checked) {
        setSelectedProductIds(new Set());
        return;
      }
      setSelectedProductIds(new Set(data.items.map((item) => item.productId)));
    },
    [data.items],
  );

  const handleBatchCorrect = useCallback(() => {
    if (!canBatch || selectedProductIds.size === 0 || isStarting) return;

    void startTask({
      kind: "sku-slices.stock-band.batch-correct",
      title: `Діапазон ${data.konkName}`,
      params: {
        bandId: data.bandId,
        dateFrom,
        dateTo,
        productIds: Array.from(selectedProductIds),
      },
    });
  }, [
    canBatch,
    data.bandId,
    data.konkName,
    dateFrom,
    dateTo,
    isStarting,
    selectedProductIds,
    startTask,
  ]);

  return (
    <SkuStockBandDiscoverContainerView
      data={data}
      selectedProductIds={selectedProductIds}
      canBatch={canBatch}
      isBatching={isStarting}
      onToggleProductId={handleToggleProductId}
      onToggleAll={handleToggleAll}
      onBatchCorrect={handleBatchCorrect}
    />
  );
}
