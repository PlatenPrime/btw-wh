import { FlatList, View, StyleSheet } from "react-native";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridCard } from "@/modules/arts/components/cards/arts-grid-card/ArtsGridCard";
import { ThemedText } from "@/components/themed-text";

interface ViewProps {
  arts: ArtDto[] | undefined;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

export function ArtsGridView({
  arts,
  onEndReached,
  onEndReachedThreshold = 0.5,
}: ViewProps) {
  if (!arts || arts.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає даних для відображення
        </ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={arts}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <ArtsGridCard art={item} />
        </View>
      )}
      keyExtractor={(item) => item.artikul}
      numColumns={1}
      contentContainerStyle={styles.contentContainer}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
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
