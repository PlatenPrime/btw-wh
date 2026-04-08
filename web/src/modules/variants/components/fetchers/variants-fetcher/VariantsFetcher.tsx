import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useVariantsQuery } from "@/modules/variants/api/hooks/queries/useVariantsQuery";
import type {
  GetVariantsParams,
  VariantsResponseDto,
} from "@/modules/variants/api/types";

interface VariantsFetcherProps {
  params: GetVariantsParams;
  ContainerComponent: React.ComponentType<{
    data: VariantsResponseDto;
  }>;
  SkeletonComponent: React.ComponentType;
}

export function VariantsFetcher({
  params,
  ContainerComponent,
  SkeletonComponent,
}: VariantsFetcherProps) {
  const variantsQuery = useVariantsQuery(params);

  if (variantsQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (variantsQuery.error) {
    return (
      <ErrorDisplay
        error={variantsQuery.error}
        title="Помилка завантаження списку варіантів"
        description="Не вдалося завантажити список варіантів"
      />
    );
  }

  if (!variantsQuery.data?.data || variantsQuery.data.data.length === 0) {
    return <LoadingNoData description="Варіанти не знайдено" />;
  }

  return (
    <DataRefetchOverlay
      isFetching={variantsQuery.isFetching}
      isLoading={variantsQuery.isLoading}
    >
      <ContainerComponent data={variantsQuery.data} />
    </DataRefetchOverlay>
  );
}

