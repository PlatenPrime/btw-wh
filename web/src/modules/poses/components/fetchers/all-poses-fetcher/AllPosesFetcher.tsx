import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { useAllPosesQuery } from "@/modules/poses/api/hooks/queries/useAllPosesQuery";
import {
  AllPosesContainer,
  AllPosesContainerSkeleton,
} from "@/modules/poses/components/containers/all-poses-container";

interface AllPosesFetcherProps {
  params?: Partial<{
    page: number;
    limit: number;
    palletId: string;
    rowId: string;
    artikul: string;
    sklad: string;
  }>;
}

export function AllPosesFetcher({ params = {} }: AllPosesFetcherProps) {
  const { data, isLoading, error } = useAllPosesQuery(params);

  if (isLoading) return <AllPosesContainerSkeleton />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження позицій"
        description="Не вдалося завантажити позиції"
      />
    );

  if (!data || !data.data || data.data.length === 0)
    return <LoadingNoData description="Позиції не знайдено" />;

  return <AllPosesContainer data={data} />;
}
