import { ErrorDisplay } from '@/components/shared/error-components/error-display';
import { LoadingNoData } from '@/components/shared/loading-states/loading-nodata';
import { useArtsQuery } from "@/modules/arts/api/hooks/queries/useArtsQuery";
import type { ArtDto, ArtsDto } from "@/modules/arts/api/types/dto";
import type { ComponentType } from "react";

interface ArtsFetcherProps {
  ContainerComponent: ComponentType<{
    data: ArtsDto;
    arts: ArtDto[];
    isPending: boolean;
    page: number;
    limit: number;
    search: string;
    onPageChange: (page: number) => void;
    onLimitChange: (limit: number) => void;
    onSearchChange: (search: string) => void;
  }>;
  SkeletonComponent: ComponentType;
  page: number;
  limit: number;
  search: string;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onSearchChange: (search: string) => void;
}

export function ArtsFetcher({
  ContainerComponent,
  SkeletonComponent,
  page,
  limit,
  search,
  onPageChange,
  onLimitChange,
  onSearchChange,
}: ArtsFetcherProps) {
  const { data, isLoading, isFetching, error } = useArtsQuery({
    page,
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

  return (
    <ContainerComponent
      data={data}
      arts={data.data}
      isPending={isFetching}
      page={page}
      limit={limit}
      search={search}
      onPageChange={onPageChange}
      onLimitChange={onLimitChange}
      onSearchChange={onSearchChange}
    />
  );
}
