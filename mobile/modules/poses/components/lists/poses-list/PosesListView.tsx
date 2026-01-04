import { FlatList, Box } from "@/components/ui";
import { RefreshControl } from "react-native";
import type { IPos } from "@/modules/poses/api/types";
import { PosCard } from "@/modules/poses/components/cards/pos-card/PosCard";
import { ThemedText } from "@/components/themed/themed-text";

interface PosesListViewProps {
  poses: IPos[] | undefined;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function PosesListView({
  poses,
  refreshing = false,
  onRefresh,
}: PosesListViewProps) {
  if (!poses || poses.length === 0) {
    return (
      <Box className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає позицій для відображення
        </ThemedText>
      </Box>
    );
  }

  return (
    <FlatList
      data={poses}
      renderItem={({ item }) => (
        <Box className="mb-2">
          <PosCard pos={item} />
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

