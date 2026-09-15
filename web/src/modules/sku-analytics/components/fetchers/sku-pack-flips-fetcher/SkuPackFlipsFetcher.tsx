import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { usePackFlipsQuery } from "@/modules/sku-analytics/api/hooks/queries/usePackFlipsQuery";
import {
  SkuPackFlipsContainer,
  SkuPackFlipsContainerSkeleton,
} from "@/modules/sku-analytics/components/containers/sku-pack-flips-container";
import { isAxiosError } from "axios";
import { useEffect, useRef } from "react";
import { toast } from "sonner";

export interface SkuPackFlipsFetcherProps {
  konkName: string;
  dateFrom: string;
  dateTo: string;
}

function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    const data = error.response?.data;
    if (
      data &&
      typeof data === "object" &&
      "message" in data &&
      typeof data.message === "string" &&
      data.message
    ) {
      return data.message;
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return "Невідома помилка";
}

export function SkuPackFlipsFetcher({
  konkName,
  dateFrom,
  dateTo,
}: SkuPackFlipsFetcherProps) {
  const packFlipsQuery = usePackFlipsQuery({
    konkName,
    dateFrom,
    dateTo,
    enabled: true,
  });
  const toastedErrorRef = useRef<unknown>(null);

  useEffect(() => {
    if (!packFlipsQuery.isError) {
      toastedErrorRef.current = null;
      return;
    }

    const error = packFlipsQuery.error;
    if (toastedErrorRef.current === error) {
      return;
    }
    toastedErrorRef.current = error;

    if (isAxiosError(error) && error.response?.status === 500) {
      toast.error("Не вдалося перевірити скачки", {
        description: "Спробуйте пізніше",
      });
    }
  }, [packFlipsQuery.isError, packFlipsQuery.error]);

  if (packFlipsQuery.isLoading && !packFlipsQuery.data) {
    return <SkuPackFlipsContainerSkeleton />;
  }

  if (packFlipsQuery.isError && !packFlipsQuery.data) {
    const status = isAxiosError(packFlipsQuery.error)
      ? packFlipsQuery.error.response?.status
      : undefined;
    const isValidation = status === 400;

    return (
      <ErrorDisplay
        error={getApiErrorMessage(packFlipsQuery.error)}
        title={
          isValidation
            ? "Помилка валідації"
            : "Помилка перевірки скачків"
        }
        description={
          isValidation
            ? "Перевірте конкурента та діапазон дат."
            : "Не вдалося отримати звіт pack-flip."
        }
        onRetry={() => void packFlipsQuery.refetch()}
        variant="compact"
      />
    );
  }

  if (!packFlipsQuery.data?.data) {
    return <LoadingNoData description="Немає даних для обраного запиту" />;
  }

  return (
    <DataRefetchOverlay
      isFetching={packFlipsQuery.isFetching}
      isLoading={packFlipsQuery.isLoading}
    >
      <SkuPackFlipsContainer data={packFlipsQuery.data.data} />
    </DataRefetchOverlay>
  );
}
