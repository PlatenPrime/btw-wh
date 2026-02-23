import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import type { KonksListResponse } from "@/modules/konks/api/types";

interface KonksFetcherProps {
  ContainerComponent: React.ComponentType<{ data: KonksListResponse }>;
  SkeletonComponent: React.ComponentType;
}

export function KonksFetcher({
  ContainerComponent,
  SkeletonComponent,
}: KonksFetcherProps) {
  const konksQuery = useKonksQuery();

  if (konksQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (konksQuery.error) {
    return (
      <ErrorDisplay
        error={konksQuery.error}
        title="Помилка завантаження списку конкурентів"
        description="Не вдалося завантажити список конкурентів"
      />
    );
  }

  if (!konksQuery.data?.data || konksQuery.data.data.length === 0) {
    return <LoadingNoData description="Конкурентів не знайдено" />;
  }

  return <ContainerComponent data={konksQuery.data} />;
}
