import { useSegmentQuery } from "@/modules/blocks/api/hooks/queries/useSegmentQuery";
import { useZonesBySegmentQuery } from "@/modules/blocks/api/hooks/queries/useZonesBySegmentQuery";
import { SegmentContainer } from "@/modules/blocks/components/containers/segment-container";
import { SegmentContainerSkeleton } from "@/modules/blocks/components/containers/segment-container";
import { View } from "react-native";
import { ThemedText } from "@/components/themed-text";

interface SegmentFetcherProps {
  segId: string;
}

export function SegmentFetcher({ segId }: SegmentFetcherProps) {
  const {
    data: segmentData,
    isLoading: isSegmentLoading,
    refetch: refetchSegment,
    isRefetching: isSegmentRefetching,
  } = useSegmentQuery({ id: segId });

  const {
    data: zonesData,
    isLoading: isZonesLoading,
    refetch: refetchZones,
    isRefetching: isZonesRefetching,
  } = useZonesBySegmentQuery({ segId, enabled: !!segmentData?.data });

  if (isSegmentLoading) {
    return <SegmentContainerSkeleton />;
  }

  if (!segmentData?.exists || !segmentData?.data) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="defaultSemiBold" className="text-center mb-2">
          Сегмент не знайдено
        </ThemedText>
        <ThemedText type="default" className="text-center">
          Сегмент з вказаним ID не існує
        </ThemedText>
      </View>
    );
  }

  const zones =
    zonesData?.exists && zonesData?.data ? zonesData.data : undefined;
  const refreshing = isSegmentRefetching || isZonesRefetching;

  const handleRefresh = () => {
    void refetchSegment();
    void refetchZones();
  };

  return (
    <SegmentContainer
      segment={segmentData.data}
      zones={zones}
      isLoadingZones={isZonesLoading}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
}

