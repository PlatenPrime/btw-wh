import { Box } from "@/components/ui";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsList } from "@/modules/rows/components/lists/rows-list/RowsList";
import { ThemedText } from "@/components/themed-text";

interface RowsContainerViewProps {
  data: RowDto[] | undefined;
  isLoading: boolean;
}

export function RowsContainerView({ data, isLoading }: RowsContainerViewProps) {
  if (isLoading) {
    return (
      <Box className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Завантаження...
        </ThemedText>
      </Box>
    );
  }

  return (
    <Box className="flex-1">
      <RowsList rows={data} />
    </Box>
  );
}

