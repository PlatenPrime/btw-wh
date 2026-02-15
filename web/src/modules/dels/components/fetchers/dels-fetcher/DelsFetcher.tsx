import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useDelsQuery } from "@/modules/dels/api/hooks/queries/useDelsQuery";
import type { DelsListResponse } from "@/modules/dels/api/types";

interface DelsFetcherProps {
  ContainerComponent: React.ComponentType<{ data: DelsListResponse }>;
  SkeletonComponent: React.ComponentType;
}

export function DelsFetcher({
  ContainerComponent,
  SkeletonComponent,
}: DelsFetcherProps) {
  const delsQuery = useDelsQuery();

  if (delsQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (delsQuery.error) {
    return (
      <ErrorDisplay
        error={delsQuery.error}
        title="Помилка завантаження списку поставок"
        description="Не вдалося завантажити список поставок"
      />
    );
  }

  if (!delsQuery.data?.data || delsQuery.data.data.length === 0) {
    return <LoadingNoData description="Поставок не знайдено" />;
  }

  return <ContainerComponent data={delsQuery.data} />;
}
