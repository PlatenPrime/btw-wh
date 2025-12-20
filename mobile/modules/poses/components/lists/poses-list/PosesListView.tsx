import { FlatList, View, StyleSheet } from "react-native";
import type { IPos } from "@/modules/poses/api/types";
import { PosCard } from "@/modules/poses/components/cards/pos-card/PosCard";
import { ThemedText } from "@/components/themed-text";

interface PosesListViewProps {
  poses: IPos[] | undefined;
}

export function PosesListView({ poses }: PosesListViewProps) {
  if (!poses || poses.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає позицій для відображення
        </ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={poses}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <PosCard pos={item} />
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

