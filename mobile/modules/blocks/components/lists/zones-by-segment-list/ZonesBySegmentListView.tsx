import { ThemedFlatList, ThemedBox } from "@/components/themed";
import { RefreshControl } from "react-native";
import type { ZoneWithSegmentDto } from "@/modules/blocks/api/types";
import { ZoneBySegmentCard } from "@/modules/blocks/components/cards/zone-by-segment-card";
import { ThemedText } from "@/components/themed/themed-text";

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
      <ThemedBox className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає зон для відображення
        </ThemedText>
      </ThemedBox>
    );
  }

  return (
    <ThemedFlatList
      data={zones}
      renderItem={({ item }) => (
        <ThemedBox className="mb-2">
          <ZoneBySegmentCard zone={item} />
        </ThemedBox>
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

