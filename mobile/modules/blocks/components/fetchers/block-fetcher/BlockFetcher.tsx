import { useBlockQuery } from "@/modules/blocks/api/hooks/queries/useBlockQuery";
import { useSegmentsByBlockQuery } from "@/modules/blocks/api/hooks/queries/useSegmentsByBlockQuery";
import { BlockContainer } from "@/modules/blocks/components/containers/block-container";
import { BlockContainerSkeleton } from "@/modules/blocks/components/containers/block-container";
import { View } from "react-native";
import { ThemedText } from "@/components/themed/themed-text";

interface BlockFetcherProps {
  blockId: string;
}

export function BlockFetcher({ blockId }: BlockFetcherProps) {
  const {
    data: blockData,
    isLoading: isBlockLoading,
    refetch: refetchBlock,
    isRefetching: isBlockRefetching,
  } = useBlockQuery({ id: blockId });

  const {
    data: segmentsData,
    isLoading: isSegmentsLoading,
    refetch: refetchSegments,
    isRefetching: isSegmentsRefetching,
  } = useSegmentsByBlockQuery({ blockId, enabled: !!blockData?.data });

  if (isBlockLoading) {
    return <BlockContainerSkeleton />;
  }

  if (!blockData?.exists || !blockData?.data) {
    return (
      <View className="flex-1 justify-center items-center p-4">
        <ThemedText type="defaultSemiBold" className="text-center mb-2">
          Блок не знайдено
        </ThemedText>
        <ThemedText type="default" className="text-center">
          Блок з вказаним ID не існує
        </ThemedText>
      </View>
    );
  }

  const segments =
    segmentsData?.exists && segmentsData?.data ? segmentsData.data : undefined;
  const refreshing = isBlockRefetching || isSegmentsRefetching;

  const handleRefresh = () => {
    void refetchBlock();
    void refetchSegments();
  };

  return (
    <BlockContainer
      block={blockData.data}
      segments={segments}
      isLoadingSegments={isSegmentsLoading}
      refreshing={refreshing}
      onRefresh={handleRefresh}
    />
  );
}

