import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { usePalletsByRowQuery } from "@/modules/pallets/api/hooks/queries/usePalletsByRowQuery";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import type { ComponentType } from "react";

interface PalletsByRowFetcherProps {
  rowId?: string;
  ContainerComponent: ComponentType<{ pallets: PalletShortDto[]; rowId: string }>;
  SkeletonComponent: ComponentType;
}

export function PalletsByRowFetcher({
  rowId,
  ContainerComponent,
  SkeletonComponent,
}: PalletsByRowFetcherProps) {
  const { data, isLoading, error } = usePalletsByRowQuery(rowId);

  if (isLoading) return <SkeletonComponent />;

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

  return <ContainerComponent pallets={data} rowId={rowId || ""} />;
}
