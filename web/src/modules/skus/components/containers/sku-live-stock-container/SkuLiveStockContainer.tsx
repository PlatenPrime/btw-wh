import { RoleType } from "@/constants/roles";
import { useAuth } from "@/modules/auth/api/hooks/useAuth";
import { useSkuStockQuery } from "@/modules/skus/api/hooks/queries/useSkuStockQuery";
import type { SkuDto } from "@/modules/skus/api/types";
import { SkuLiveStockContainerView } from "./SkuLiveStockContainerView";
import type { AxiosError } from "axios";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

interface SkuLiveStockContainerProps {
  sku: SkuDto;
}

interface StockErrorBody {
  message?: string;
}

export function SkuLiveStockContainer({ sku }: SkuLiveStockContainerProps) {
  const { hasRole } = useAuth();
  const [requested, setRequested] = useState(false);
  const lastToastedError = useRef<unknown>(null);

  const canView = hasRole(RoleType.ADMIN);

  const query = useSkuStockQuery({
    id: sku._id,
    enabled: requested && canView,
  });

  useEffect(() => {
    if (!query.isError || !query.error) return;
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

  if (!canView) return null;

  return (
    <SkuLiveStockContainerView
      hasRequested={requested}
      isLoading={query.isFetching}
      isError={query.isError}
      data={query.data?.data ?? null}
      onRequest={() => {
        setRequested(true);
        if (requested) {
          void query.refetch();
        }
      }}
    />
  );
}
