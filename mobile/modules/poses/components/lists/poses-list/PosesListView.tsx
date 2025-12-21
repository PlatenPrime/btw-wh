import { FlatList, Box } from "@/components/ui";
import type { IPos } from "@/modules/poses/api/types";
import { PosCard } from "@/modules/poses/components/cards/pos-card/PosCard";
import { ThemedText } from "@/components/themed-text";

interface PosesListViewProps {
  poses: IPos[] | undefined;
}

export function PosesListView({ poses }: PosesListViewProps) {
  if (!poses || poses.length === 0) {
    return (
      <Box className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає позицій для відображення
        </ThemedText>
      </Box>
    );
  }

  return (
    <FlatList
      data={poses}
      renderItem={({ item }) => (
        <Box className="mb-2">
          <PosCard pos={item} />
        </Box>
      )}
      keyExtractor={(item) => item._id}
      contentContainerClassName="p-2"
      showsVerticalScrollIndicator={false}
    />
  );
}

