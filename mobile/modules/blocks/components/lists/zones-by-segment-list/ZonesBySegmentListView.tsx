import { FlatList, Box } from "@/components/ui";
import { RefreshControl } from "react-native";
import type { ZoneWithSegmentDto } from "@/modules/blocks/api/types";
import { ZoneBySegmentCard } from "@/modules/blocks/components/cards/zone-by-segment-card";
import { ThemedText } from "@/components/themed-text";

interface ZonesBySegmentListViewProps {
  zones: ZoneWithSegmentDto[] | undefined;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ZonesBySegmentListView({
  zones,
  refreshing = false,
  onRefresh,
}: ZonesBySegmentListViewProps) {
  if (!zones || zones.length === 0) {
    return (
      <Box className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає зон для відображення
        </ThemedText>
      </Box>
    );
  }

  return (
    <FlatList
      data={zones}
      renderItem={({ item }) => (
        <Box className="mb-2">
          <ZoneBySegmentCard zone={item} />
        </Box>
      )}
      keyExtractor={(item) => item._id}
      className="flex-1"
      contentContainerClassName="p-2"
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    />
  );
}

