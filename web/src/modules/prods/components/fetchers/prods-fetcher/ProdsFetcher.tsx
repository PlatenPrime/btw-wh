import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import type { ProdsListResponse } from "@/modules/prods/api/types";

interface ProdsFetcherProps {
  ContainerComponent: React.ComponentType<{ data: ProdsListResponse }>;
  SkeletonComponent: React.ComponentType;
}

export function ProdsFetcher({
  ContainerComponent,
  SkeletonComponent,
}: ProdsFetcherProps) {
  const prodsQuery = useProdsQuery();

  if (prodsQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (prodsQuery.error) {
    return (
      <ErrorDisplay
        error={prodsQuery.error}
        title="Помилка завантаження списку виробників"
        description="Не вдалося завантажити список виробників"
      />
    );
  }

  if (!prodsQuery.data?.data || prodsQuery.data.data.length === 0) {
    return <LoadingNoData description="Виробників не знайдено" />;
  }

  return <ContainerComponent data={prodsQuery.data} />;
}
