import { ThemedFlatList, ThemedBox } from "@/components/themed";
import { RefreshControl } from "react-native";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowCard } from "@/modules/rows/components/cards/row-card/RowCard";
import { ThemedText } from "@/components/themed/themed-text";

interface RowsListViewProps {
  rows: RowDto[] | undefined;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function RowsListView({
  rows,
  refreshing = false,
  onRefresh,
}: RowsListViewProps) {
  if (!rows || rows.length === 0) {
    return (
      <ThemedBox className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає рядів для відображення
        </ThemedText>
      </ThemedBox>
    );
  }

  return (
    <ThemedFlatList
      data={rows}
      renderItem={({ item }) => (
        <ThemedBox className="mb-2">
          <RowCard row={item} />
        </ThemedBox>
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

