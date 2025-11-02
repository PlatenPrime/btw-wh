import { ErrorDisplay } from "@/components/shared/error-components/error-display";
import { EntityNotFound } from "@/components/shared/entity-not-found";
import { usePullByPalletIdQuery } from "@/modules/pulls/api/hooks/queries/usePullByPalletIdQuery";
import type { IPull } from "@/modules/pulls/api/types/dto";
import type { ComponentType } from "react";

interface PullFetcherProps {
  palletId: string;
  ContainerComponent: ComponentType<{ pull: IPull }>;
  SkeletonComponent: ComponentType;
}

export function PullFetcher({
  palletId,
  ContainerComponent,
  SkeletonComponent,
}: PullFetcherProps) {
  const {
    data: pullResponse,
    isLoading,
    error,
    refetch,
  } = usePullByPalletIdQuery({
    palletId,
  });

  if (isLoading) return <SkeletonComponent />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження pull"
        description="Не вдалося завантажити pull для паллети"
      />
    );

  if (!pullResponse || !pullResponse.exists || !pullResponse.data)
    return (
      <EntityNotFound
        title="Pull не знайдено"
        description="Для цієї паллети немає активних pulls"
        onRetry={() => refetch()}
      />
    );

  return <ContainerComponent pull={pullResponse.data} />;
}

