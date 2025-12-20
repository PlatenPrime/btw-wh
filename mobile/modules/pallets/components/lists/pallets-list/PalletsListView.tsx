import { FlatList, View, StyleSheet } from "react-native";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletCard } from "@/modules/pallets/components/cards/pallet-card/PalletCard";
import { ThemedText } from "@/components/themed-text";

interface PalletsListViewProps {
  pallets: PalletShortDto[] | undefined;
  rowId: string;
}

export function PalletsListView({ pallets, rowId }: PalletsListViewProps) {
  if (!pallets || pallets.length === 0) {
    return (
      <View className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає паллет для відображення
        </ThemedText>
      </View>
    );
  }

  return (
    <FlatList
      data={pallets}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <PalletCard pallet={item} rowId={rowId} />
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

