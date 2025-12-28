import { FlatList, Box } from "@/components/ui";
import { RefreshControl } from "react-native";
import type { BlockDto } from "@/modules/blocks/api/types";
import { BlockCard } from "@/modules/blocks/components/cards/block-card";
import { ThemedText } from "@/components/themed-text";

interface BlocksListViewProps {
  blocks: BlockDto[] | undefined;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function BlocksListView({
  blocks,
  refreshing = false,
  onRefresh,
}: BlocksListViewProps) {
  if (!blocks || blocks.length === 0) {
    return (
      <Box className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає блоків для відображення
        </ThemedText>
      </Box>
    );
  }

  return (
    <FlatList
      data={blocks}
      renderItem={({ item }) => (
        <Box className="mb-2">
          <BlockCard block={item} />
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

