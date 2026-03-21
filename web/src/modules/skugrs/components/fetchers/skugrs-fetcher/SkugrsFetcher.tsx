import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useSkugrsQuery } from "@/modules/skugrs/api/hooks/queries/useSkugrsQuery";
import type {
  GetSkugrsParams,
  SkugrsResponseDto,
} from "@/modules/skugrs/api/types";

interface SkugrsFetcherProps {
  params: GetSkugrsParams;
  ContainerComponent: React.ComponentType<{ data: SkugrsResponseDto }>;
  SkeletonComponent: React.ComponentType;
}

export function SkugrsFetcher({
  params,
  ContainerComponent,
  SkeletonComponent,
}: SkugrsFetcherProps) {
  const skugrsQuery = useSkugrsQuery(params);

  if (skugrsQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (skugrsQuery.error) {
    return (
      <ErrorDisplay
        error={skugrsQuery.error}
        title="Помилка завантаження товарних груп"
        description="Не вдалося завантажити список груп"
      />
    );
  }

  if (!skugrsQuery.data?.data || skugrsQuery.data.data.length === 0) {
    return <LoadingNoData description="Товарні групи не знайдено" />;
  }

  return <ContainerComponent data={skugrsQuery.data} />;
}
