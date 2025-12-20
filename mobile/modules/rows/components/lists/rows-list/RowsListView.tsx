import { FlatList, View, StyleSheet } from "react-native";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowCard } from "@/modules/rows/components/cards/row-card/RowCard";
import { ThemedText } from "@/components/themed-text";

interface RowsListViewProps {
  rows: RowDto[] | undefined;
}

export function RowsListView({ rows }: RowsListViewProps) {
  if (!rows || rows.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає рядів для відображення
        </ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={rows}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <RowCard row={item} />
        </View>
      )}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    padding: 8,
  },
  itemContainer: {
    marginBottom: 8,
  },
});

