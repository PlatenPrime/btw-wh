import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { useAskQuery } from "@/modules/asks/api/hooks/queries/useAskQuery";
import type { AskDto } from "@/modules/asks/api/types/dto";
import type { ComponentType } from "react";

interface AskFetcherProps {
  id: string;
  ContainerComponent: ComponentType<{ askData: AskDto }>;
  SkeletonComponent: ComponentType;
}

export function AskFetcher({
  id,
  ContainerComponent,
  SkeletonComponent,
}: AskFetcherProps) {
  const { data: askData, isLoading, error } = useAskQuery({ id });

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження запиту"
        description="Не вдалося завантажити запит"
      />
    );

  if (!askData)
    return <LoadingNoData description="Немає даних для відображення" />;

  return <ContainerComponent askData={askData.data} />;
}
