import { ErrorDisplay } from '@/components/shared/error-components/error-display';
import { LoadingNoData } from '@/components/shared/loading-states/loading-nodata';
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
  const palletsQuery = usePalletsByRowQuery(rowId);

  if (palletsQuery.isLoading) return <SkeletonComponent />;

  if (palletsQuery.error)
    return (
      <ErrorDisplay
        error={palletsQuery.error}
        title="Помилка завантаження палет"
        description="Не вдалося завантажити дані палет для цього ряду"
      />
    );

  if (!palletsQuery.data || !palletsQuery.data.length)
    return <LoadingNoData description="Палети не знайдено" />;

  return <ContainerComponent pallets={palletsQuery.data} rowId={rowId || ""} />;
}
