import { EntityNotFound } from "@/components/shared/entity-not-found";
import { ErrorDisplay } from "@/components/shared/error-components/error-display";
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
  const { data: askResponse, isLoading, error, refetch } = useAskQuery({ id });

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження запиту"
        description="Не вдалося завантажити запит"
      />
    );

  if (!askResponse || !askResponse.exists)
    return (
      <EntityNotFound
        title="Запит не знайдено"
        description="Запит з таким ID не існує або був видалений"
        onRetry={() => refetch()}
      />
    );

  return <ContainerComponent askData={askResponse.data!} />;
}
