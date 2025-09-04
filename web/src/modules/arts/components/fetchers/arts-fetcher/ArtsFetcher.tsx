import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { useArtsInfiniteQuery } from "@/modules/arts/api/hooks/useArtsInfiniteQuery";
import { useState } from "react";
import { ArtsContainer } from "../../containers/arts-container/ArtsContainer";
import { ArtsContainerSkeleton } from "../../containers/arts-container/ArtsContainerSkeleton";

export function ArtsFetcher() {
  const [search, setSearch] = useState("");
  const limit = 20;

  const {
    data,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useArtsInfiniteQuery({
    limit,
    search,
  });

  if (isLoading) return <ArtsContainerSkeleton />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження артикулів"
        description="Не вдалося завантажити артикули"
      />
    );

  if (!data)
    return <LoadingNoData description="Немає даних для відображення" />;

  const flatData = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <ArtsContainer
      data={flatData}
      isFetching={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      search={search}
      onSearchChange={setSearch}
    />
  );
}
