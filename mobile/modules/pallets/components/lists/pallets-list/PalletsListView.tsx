import { FlatList, Box } from "@/components/ui";
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
      <Box className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає паллет для відображення
        </ThemedText>
      </Box>
    );
  }

  return (
    <FlatList
      data={pallets}
      renderItem={({ item }) => (
        <Box className="mb-2">
          <PalletCard pallet={item} rowId={rowId} />
        </Box>
      )}
      keyExtractor={(item) => item._id}
      contentContainerClassName="p-2"
      showsVerticalScrollIndicator={false}
    />
  );
}

