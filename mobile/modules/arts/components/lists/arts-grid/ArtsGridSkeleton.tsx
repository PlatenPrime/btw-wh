import { FlatList, View, StyleSheet } from "react-native";
import { ArtGridCardSkeleton } from "@/modules/arts/components/cards/arts-grid-card/ArtGridCardSkeleton";

export function ArtsGridSkeleton() {
  return (
    <FlatList
      data={Array.from({ length: 10 })}
      renderItem={() => (
        <View style={styles.itemContainer}>
          <ArtGridCardSkeleton />
        </View>
      )}
      keyExtractor={(_, index) => `skeleton-${index}`}
      numColumns={1}
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
