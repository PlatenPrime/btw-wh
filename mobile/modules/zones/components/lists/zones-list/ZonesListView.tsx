import { FlatList, Box } from "@/components/ui";
import { RefreshControl } from "react-native";
import type { ZoneDto } from "@/modules/zones/api/types/dto";
import { ZoneCard } from "@/modules/zones/components/cards/zone-card/ZoneCard";
import { ThemedText } from "@/components/themed-text";

interface ZonesListViewProps {
  zones: ZoneDto[] | undefined;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ZonesListView({
  zones,
  refreshing = false,
  onRefresh,
}: ZonesListViewProps) {
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
          <ZoneCard zone={item} />
        </Box>
      )}
      keyExtractor={(item) => item._id}
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

