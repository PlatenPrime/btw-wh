import { ErrorDisplay } from "@/components/error-components/error-display";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { useArtsInfiniteQuery } from "@/modules/arts/api/hooks/queries/useArtsInfiniteQuery";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import type { ComponentType } from "react";
import { useState } from "react";

interface ArtsFetcherProps {
  ContainerComponent: ComponentType<{
    data: ArtDto[];
    isFetchingNextPage: boolean;
    hasNextPage: boolean;
    fetchNextPage: () => void;
    search: string;
    onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  }>;
  SkeletonComponent: ComponentType;
  limit?: number;
  initialSearch?: string;
}

export function ArtsFetcher({
  ContainerComponent,
  SkeletonComponent,
  limit = 20,
  initialSearch = "",
}: ArtsFetcherProps) {
  const [search, setSearch] = useState(initialSearch);

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

  if (isLoading) return <SkeletonComponent />;

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
    <ContainerComponent
      data={flatData}
      isFetchingNextPage={isFetchingNextPage}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      search={search}
      onSearchChange={setSearch}
    />
  );
}
