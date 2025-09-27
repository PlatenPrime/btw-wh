import { useLatestDefsQuery } from "@/modules/defs/api/hooks/queries/useLatestDefsQuery";
import { LatestDefsFetcherView } from "@/modules/defs/components/fetchers/latest-defs-fetcher/LatestDefsFetcherView";

export function LatestDefsFetcher() {
  const { data, isLoading, error, refetch } = useLatestDefsQuery();

  return (
    <LatestDefsFetcherView
      data={data}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
    />
  );
}
