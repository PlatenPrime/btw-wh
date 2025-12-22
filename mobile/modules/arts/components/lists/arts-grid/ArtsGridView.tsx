import { FlatList, Box } from "@/components/ui";
import { RefreshControl } from "react-native";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridCard } from "@/modules/arts/components/cards/arts-grid-card/ArtsGridCard";
import { ThemedText } from "@/components/themed-text";

interface ViewProps {
  arts: ArtDto[] | undefined;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function ArtsGridView({
  arts,
  onEndReached,
  onEndReachedThreshold = 0.5,
  refreshing = false,
  onRefresh,
}: ViewProps) {
  if (!arts || arts.length === 0) {
    return (
      <Box className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає даних для відображення
        </ThemedText>
      </Box>
    );
  }

  return (
    <FlatList
      data={arts}
      renderItem={({ item }) => (
        <Box className="mb-2">
          <ArtsGridCard art={item} />
        </Box>
      )}
      keyExtractor={(item) => item.artikul}
      numColumns={1}
      contentContainerClassName="p-2"
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        ) : undefined
      }
    />
  );
}
