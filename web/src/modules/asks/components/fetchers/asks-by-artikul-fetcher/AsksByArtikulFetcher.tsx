import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/errors";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { useAsksByArtikulQuery } from "@/modules/asks/api/hooks/queries/useAsksByArtikulQuery";
import type { GetAsksByArtikulResponse } from "@/modules/asks/api/types/dto";
import type { ComponentType } from "react";

export interface AsksByArtikulFetcherProps {
  ContainerComponent: ComponentType<{
    data: GetAsksByArtikulResponse;
  }>;
  SkeletonComponent: ComponentType;
  artikul: string;
}

export function AsksByArtikulFetcher({
  ContainerComponent,
  SkeletonComponent,
  artikul,
}: AsksByArtikulFetcherProps) {
  const asksQuery = useAsksByArtikulQuery({
    artikul,
  });

  if (asksQuery.isLoading) return <SkeletonComponent />;

  if (asksQuery.error)
    return (
      <ErrorDisplay
        error={asksQuery.error}
        title="Помилка завантаження запитів"
        description="Не вдалося завантажити запити для обраного артикулу"
      />
    );

  if (!asksQuery.data)
    return <LoadingNoData description="Немає даних для відображення" />;

  return (
    <DataRefetchOverlay
      isFetching={asksQuery.isFetching}
      isLoading={asksQuery.isLoading}
    >
      <ContainerComponent data={asksQuery.data} />
    </DataRefetchOverlay>
  );
}
