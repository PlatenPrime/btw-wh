import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states";
import { useSegmentsByBlockQuery } from "@/modules/blocks/api/hooks/queries/useSegmentsByBlockQuery";
import type { SegmentDto } from "@/modules/blocks/api/types";
import type { ComponentType } from "react";

interface SegmentsFetcherProps {
  blockId: string;
  ContainerComponent: ComponentType<{ data: SegmentDto[] }>;
  SkeletonComponent: ComponentType;
}

export function SegmentsFetcher({
  blockId,
  ContainerComponent,
  SkeletonComponent,
}: SegmentsFetcherProps) {
  const { data, isLoading, error } = useSegmentsByBlockQuery({
    blockId,
    enabled: !!blockId,
  });

  if (isLoading) {
    return <SkeletonComponent />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження сегментів"
        description="Не вдалося завантажити список сегментів"
      />
    );
  }

  if (!data || !data.exists) {
    return <LoadingNoData description="Сегменти не знайдено" />;
  }

  return <ContainerComponent data={data.data || []} />;
}

