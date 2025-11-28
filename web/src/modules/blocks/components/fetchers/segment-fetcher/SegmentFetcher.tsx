import { ErrorDisplay } from "@/components/shared/error-components";
import { useSegmentQuery } from "@/modules/blocks/api/hooks/queries/useSegmentQuery";
import { useZonesBySegmentQuery } from "@/modules/blocks/api/hooks/queries/useZonesBySegmentQuery";
import type { SegmentDto, ZoneWithSegmentDto } from "@/modules/blocks/api/types";
import type { ComponentType } from "react";

interface SegmentFetcherProps {
  segId: string;
  ContainerComponent: ComponentType<{
    segment: SegmentDto;
    zones: ZoneWithSegmentDto[];
    isLoadingZones: boolean;
    zonesError: Error | null;
  }>;
  SkeletonComponent: ComponentType;
}

export function SegmentFetcher({
  segId,
  ContainerComponent,
  SkeletonComponent,
}: SegmentFetcherProps) {
  const {
    data: segmentData,
    isLoading: isSegmentLoading,
    error: segmentError,
  } = useSegmentQuery({
    id: segId,
    enabled: !!segId,
  });

  const {
    data: zonesData,
    isLoading: isZonesLoading,
    error: zonesError,
  } = useZonesBySegmentQuery({
    segId: segId,
    enabled: !!segId,
  });

  if (isSegmentLoading) {
    return <SkeletonComponent />;
  }

  if (segmentError) {
    return (
      <ErrorDisplay
        error={segmentError}
        title="Помилка завантаження сегмента"
        description="Не вдалося завантажити дані сегмента"
      />
    );
  }

  if (!segmentData || !segmentData.exists || !segmentData.data) {
    return (
      <ErrorDisplay
        error={new Error("Сегмент не знайдено")}
        title="Сегмент не знайдено"
        description="Сегмент з вказаним ID не існує"
      />
    );
  }

  const zones =
    zonesData?.exists && zonesData?.data ? zonesData.data : [];

  return (
    <ContainerComponent
      segment={segmentData.data}
      zones={zones}
      isLoadingZones={isZonesLoading}
      zonesError={zonesError}
    />
  );
}

