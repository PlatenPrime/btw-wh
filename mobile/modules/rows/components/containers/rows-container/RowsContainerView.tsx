import { ThemedBox } from "@/components/themed";
import type { RowDto } from "@/modules/rows/api/types/dto";
import { RowsList } from "@/modules/rows/components/lists/rows-list/RowsList";
import { ThemedText } from "@/components/themed/themed-text";

interface RowsContainerViewProps {
  data: RowDto[] | undefined;
  isLoading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function RowsContainerView({
  data,
  isLoading,
  refreshing,
  onRefresh,
}: RowsContainerViewProps) {
  if (isLoading) {
    return (
      <ThemedBox className="flex-1 justify-center items-center py-8">
        <ThemedText type="default" className="text-center">
          Завантаження...
        </ThemedText>
      </ThemedBox>
    );
  }

  return (
    <ThemedBox className="flex-1">
      <RowsList rows={data} refreshing={refreshing} onRefresh={onRefresh} />
    </ThemedBox>
  );
}

