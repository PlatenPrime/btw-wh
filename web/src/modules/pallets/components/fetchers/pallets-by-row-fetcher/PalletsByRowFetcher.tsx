import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { usePalletsByRowQuery } from "@/modules/pallets/api/hooks/queries/usePalletsByRowQuery";
import {
  PalletsByRowContainer,
  PalletsByRowContainerSkeleton,
} from "@/modules/pallets/components/containers/pallets-by-row-container";

interface PalletsByRowFetcherProps {
  rowId?: string;
}

export function PalletsByRowFetcher({ rowId }: PalletsByRowFetcherProps) {
  const { data, isLoading, error } = usePalletsByRowQuery(rowId);

  if (isLoading) return <PalletsByRowContainerSkeleton />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження палет"
        description="Не вдалося завантажити дані палет для цього ряду"
      />
    );

  if (!data || !data.length)
    return <LoadingNoData description="Палети не знайдено" />;

  return <PalletsByRowContainer pallets={data} rowId={rowId || ""} />;
}
