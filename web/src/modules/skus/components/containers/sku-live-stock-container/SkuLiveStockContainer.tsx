import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { useSkuStockQuery } from "@/modules/skus/api/hooks/queries/useSkuStockQuery";
import { getSkuById } from "@/modules/skus/api/services/queries/getSkuById";
import type { SkuDto } from "@/modules/skus/api/types";
import { SkuLiveStockContainerSkeleton } from "./SkuLiveStockContainerSkeleton";
import { SkuLiveStockContainerView } from "./SkuLiveStockContainerView";
import { useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

interface SkuLiveStockContainerProps {
  sku: SkuDto;
}

interface StockErrorBody {
  message?: string;
}

export function SkuLiveStockContainer({ sku }: SkuLiveStockContainerProps) {
  const { hasRole } = useAuth();
  const queryClient = useQueryClient();
  const lastToastedError = useRef<unknown>(null);
  const lastSyncedAt = useRef(0);

  const canView = hasRole(RoleType.ADMIN);

  const query = useSkuStockQuery({
    id: sku._id,
    enabled: canView,
  });

  useEffect(() => {
    if (!query.isError) {
      lastToastedError.current = null;
      return;
    }
    if (!query.error) return;
    if (lastToastedError.current === query.error) return;
    lastToastedError.current = query.error;

    const error = query.error as AxiosError<StockErrorBody>;
    const status = error.response?.status;
    const message = error.response?.data?.message;

    if (status === 400) {
      toast.error(message || "Некоректний запит або конкурент без live-залишку");
    } else if (status === 404) {
      toast.error("Товар не знайдено або дані недоступні");
    } else {
      toast.error(message || "Помилка отримання залишку. Спробуйте пізніше");
    }
  }, [query.isError, query.error]);

  // Silent cache patch: не invalidate — иначе SkuFetcher вешает DataRefetchOverlay на всю карточку.
  useEffect(() => {
    if (!query.isSuccess || !query.dataUpdatedAt) return;
    if (lastSyncedAt.current === query.dataUpdatedAt) return;
    lastSyncedAt.current = query.dataUpdatedAt;

    let cancelled = false;
    void getSkuById(sku._id)
      .then((fresh) => {
        if (cancelled) return;
        queryClient.setQueryData(["skus", "id", sku._id], fresh);
      })
      .catch(() => {
        // артикул write-once — best-effort, остаток уже на экране
      });

    return () => {
      cancelled = true;
    };
  }, [query.isSuccess, query.dataUpdatedAt, queryClient, sku._id]);

  if (!canView) return null;

  if (query.isLoading) {
    return <SkuLiveStockContainerSkeleton />;
  }

  return (
    <SkuLiveStockContainerView
      isRefreshing={query.isFetching}
      isError={query.isError}
      data={query.data?.data ?? null}
      onRefresh={() => {
        if (query.isFetching) return;
        void query.refetch();
      }}
    />
  );
}
