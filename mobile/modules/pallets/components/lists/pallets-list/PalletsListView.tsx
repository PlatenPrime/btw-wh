import { ThemedFlatList, ThemedBox } from "@/components/themed";
import { RefreshControl } from "react-native";
import type { PalletShortDto } from "@/modules/pallets/api/types";
import { PalletCard } from "@/modules/pallets/components/cards/pallet-card/PalletCard";
import { ThemedText } from "@/components/themed/themed-text";

interface PalletsListViewProps {
  pallets: PalletShortDto[] | undefined;
  rowId: string;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function PalletsListView({
  pallets,
  rowId,
  refreshing = false,
  onRefresh,
}: PalletsListViewProps) {
  if (!pallets || pallets.length === 0) {
    return (
      <ThemedBox className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає паллет для відображення
        </ThemedText>
      </ThemedBox>
    );
  }

  return (
    <ThemedFlatList
      data={pallets}
      renderItem={({ item }) => (
        <ThemedBox className="mb-2">
          <PalletCard pallet={item} rowId={rowId} />
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

