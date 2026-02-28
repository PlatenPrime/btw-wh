import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useAnalogsByArtikulQuery } from "@/modules/analogs/api/hooks/queries/useAnalogsByArtikulQuery";
import type { AnalogsByArtikulResponseDto } from "@/modules/analogs/api/types";

interface AnalogsByArtikulFetcherProps {
  artikul: string;
  ContainerComponent: React.ComponentType<{
    data: AnalogsByArtikulResponseDto;
  }>;
  SkeletonComponent: React.ComponentType;
}

export function AnalogsByArtikulFetcher({
  artikul,
  ContainerComponent,
  SkeletonComponent,
}: AnalogsByArtikulFetcherProps) {
  const analogsQuery = useAnalogsByArtikulQuery(artikul);

  if (analogsQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (analogsQuery.error) {
    return (
      <ErrorDisplay
        error={analogsQuery.error}
        title="Помилка завантаження аналогів за артикулом"
        description="Не вдалося завантажити список аналогів"
      />
    );
  }

  if (!analogsQuery.data?.data || analogsQuery.data.data.length === 0) {
    return (
      <LoadingNoData description="Аналоги з таким артикулом не знайдено" />
    );
  }

  return <ContainerComponent data={analogsQuery.data} />;
}
