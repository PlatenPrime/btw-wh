import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { useBtradeArtDataQuery } from "@/modules/arts/api/hooks/queries/useBtradeArtDataQuery";
import type { BtradeArtInfoDto } from "@/modules/arts/api/types/dto";
import type { ComponentType } from "react";

export interface BtradeArtDataContainerProps {
  artikul: string;
  exists: boolean;
  message: string;
  data: BtradeArtInfoDto | null;
  onRetry: () => void;
}

interface BtradeArtDataFetcherProps {
  artikul: string | undefined;
  ContainerComponent: ComponentType<BtradeArtDataContainerProps>;
  SkeletonComponent: ComponentType;
}

export function BtradeArtDataFetcher({
  artikul,
  ContainerComponent,
  SkeletonComponent,
}: BtradeArtDataFetcherProps) {
  if (!artikul) {
    return <LoadingNoData description="Артикул не передан для завантаження даних" />;
  }

  const {
    data: btradeArtResponse,
    isLoading,
    error,
    refetch,
  } = useBtradeArtDataQuery(artikul);

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження даних з sharik.ua"
        description="Не вдалося завантажити дані з sharik.ua"
      />
    );

  if (!btradeArtResponse) {
    return <LoadingNoData description="Немає даних для відображення" />;
  }

  const containerProps: BtradeArtDataContainerProps = {
    artikul,
    exists: btradeArtResponse.exists,
    message: btradeArtResponse.message,
    data: btradeArtResponse.data,
    onRetry: () => {
      void refetch();
    },
  };

  return <ContainerComponent {...containerProps} />;
}
