import { ThemedFlatList, ThemedBox, ThemedVStack } from "@/components/themed";
import { RefreshControl } from "react-native";
import type { SegmentDto } from "@/modules/blocks/api/types";
import { SegmentCard } from "@/modules/blocks/components/cards/segment-card";
import { ThemedText } from "@/components/themed/themed-text";
import type { ReactNode } from "react";

interface SegmentsListViewProps {
  segments: SegmentDto[] | undefined;
  blockId: string;
  refreshing?: boolean;
  onRefresh?: () => void;
  headerComponent?: ReactNode;
}

export function SegmentsListView({
  segments,
  blockId,
  refreshing = false,
  onRefresh,
  headerComponent,
}: SegmentsListViewProps) {
  if (!segments || segments.length === 0) {
    return (
      <ThemedBox className="flex-1">
        {headerComponent && (
          <ThemedBox className="p-2">
            {headerComponent}
          </ThemedBox>
        )}
        <ThemedBox className="flex-1 justify-center items-center py-8">
          <ThemedText type="default" className="text-center">
            Немає сегментів для відображення
          </ThemedText>
        </ThemedBox>
      </ThemedBox>
    );
  }

  return (
    <ThemedFlatList
      data={segments}
      renderItem={({ item }) => (
        <ThemedBox className="mb-2">
          <SegmentCard segment={item} blockId={blockId} />
        </ThemedBox>
      )}
      keyExtractor={(item) => item._id}
      contentContainerClassName="p-2"
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        headerComponent ? (
          <ThemedBox className="mb-4">
            {headerComponent}
          </ThemedBox>
        ) : undefined
      }
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    />
  );
}

