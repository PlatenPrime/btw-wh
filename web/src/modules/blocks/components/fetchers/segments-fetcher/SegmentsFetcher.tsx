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
  const segmentsQuery = useSegmentsByBlockQuery({
    blockId,
    enabled: !!blockId,
  });

  if (segmentsQuery.isLoading) {
    return <SkeletonComponent />;
  }

  if (segmentsQuery.error) {
    return (
      <ErrorDisplay
        error={segmentsQuery.error}
        title="Помилка завантаження сегментів"
        description="Не вдалося завантажити список сегментів"
      />
    );
  }

  if (!segmentsQuery.data || !segmentsQuery.data.exists) {
    return <LoadingNoData description="Сегменти не знайдено" />;
  }

  return <ContainerComponent data={segmentsQuery.data.data || []} />;
}

