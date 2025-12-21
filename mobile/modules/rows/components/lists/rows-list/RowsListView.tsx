import { FlatList, Box } from "@/components/ui";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowCard } from "@/modules/rows/components/cards/row-card/RowCard";
import { ThemedText } from "@/components/themed-text";

interface RowsListViewProps {
  rows: RowDto[] | undefined;
}

export function RowsListView({ rows }: RowsListViewProps) {
  if (!rows || rows.length === 0) {
    return (
      <Box className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Немає рядів для відображення
        </ThemedText>
      </Box>
    );
  }

  return (
    <FlatList
      data={rows}
      renderItem={({ item }) => (
        <Box className="mb-2">
          <RowCard row={item} />
        </Box>
      )}
      keyExtractor={(item) => item._id}
      contentContainerClassName="p-2"
      showsVerticalScrollIndicator={false}
    />
  );
}

