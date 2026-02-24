import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useConstantsQuery } from "@/modules/constants/api/hooks/queries/useConstantsQuery";
import type { ConstantsListResponse } from "@/modules/constants/api/types";

interface ConstantsFetcherProps {
  ContainerComponent: React.ComponentType<{ data: ConstantsListResponse }>;
  SkeletonComponent: React.ComponentType;
}

export function ConstantsFetcher({
  ContainerComponent,
  SkeletonComponent,
}: ConstantsFetcherProps) {
  const constantsQuery = useConstantsQuery();

  if (constantsQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (constantsQuery.error) {
    return (
      <ErrorDisplay
        error={constantsQuery.error}
        title="Помилка завантаження списку констант"
        description="Не вдалося завантажити список констант"
      />
    );
  }

  const data = constantsQuery.data;
  if (!data?.data || data.data.length === 0) {
    return <LoadingNoData description="Констант не знайдено" />;
  }

  return <ContainerComponent data={data} />;
}
