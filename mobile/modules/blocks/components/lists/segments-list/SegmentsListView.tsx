import { FlatList, Box, VStack } from "@/components/ui";
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
      <Box className="flex-1">
        {headerComponent && (
          <Box className="p-2">
            {headerComponent}
          </Box>
        )}
        <Box className="flex-1 justify-center items-center py-8">
          <ThemedText type="default" className="text-center">
            Немає сегментів для відображення
          </ThemedText>
        </Box>
      </Box>
    );
  }

  return (
    <FlatList
      data={segments}
      renderItem={({ item }) => (
        <Box className="mb-2">
          <SegmentCard segment={item} blockId={blockId} />
        </Box>
      )}
      keyExtractor={(item) => item._id}
      contentContainerClassName="p-2"
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        headerComponent ? (
          <Box className="mb-4">
            {headerComponent}
          </Box>
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

