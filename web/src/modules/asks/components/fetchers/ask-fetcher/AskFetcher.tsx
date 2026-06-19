import { ContentReveal } from "@/components/shared/motion";
import { EntityNotFound } from "@/components/shared/entities/entity-not-found";
import { ErrorDisplay } from "@/components/shared/errors";
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
  const askQuery = useAskQuery({ id });
  const askResponse = askQuery.data;

  if (askQuery.isLoading) return <SkeletonComponent />;

  if (askQuery.error)
    return (
      <ErrorDisplay
        error={askQuery.error}
        title="Помилка завантаження запиту"
        description="Не вдалося завантажити запит"
      />
    );

  if (!askResponse || !askResponse.exists)
    return (
      <EntityNotFound
        title="Запит не знайдено"
        description="Запит з таким ID не існує або був видалений"
        onRetry={() => askQuery.refetch()}
      />
    );

  return (
    <ContentReveal>
      <ContainerComponent askData={askResponse.data!} />
    </ContentReveal>
  );
}
