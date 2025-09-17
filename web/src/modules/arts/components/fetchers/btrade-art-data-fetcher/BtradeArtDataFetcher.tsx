import { ErrorDisplay } from '@/components/shared/error-components';
import { LoadingNoData } from '@/components/shared/loading-states/loading-nodata';
import { useBtradeArtDataQuery } from "@/modules/arts/api/hooks/queries/useBtradeArtDataQuery";
import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import type { ComponentType } from "react";

interface BtradeArtDataFetcherProps {
  artikul: string | undefined;
  ContainerComponent: ComponentType<{ data: BtradeArtInfoDto }>;
  SkeletonComponent: ComponentType;
}

export function BtradeArtDataFetcher({
  artikul,
  ContainerComponent,
  SkeletonComponent,
}: BtradeArtDataFetcherProps) {
  const {
    data: btradeArtData,
    isLoading,
    error,
  } = useBtradeArtDataQuery(artikul ?? "");

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження даних з sharik.ua"
        description="Не вдалося завантажити дані з sharik.ua"
      />
    );

  if (!btradeArtData)
    return <LoadingNoData description="Немає даних для відображення" />;

  return <ContainerComponent data={btradeArtData} />;
}
