import { ThemedBox } from "@/components/themed";
import type { BlockDto } from "@/modules/blocks/api/types";
import { BlocksList } from "@/modules/blocks/components/lists/blocks-list";
import { ThemedText } from "@/components/themed/themed-text";

interface BlocksContainerViewProps {
  blocks: BlockDto[] | undefined;
  isLoading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function BlocksContainerView({
  blocks,
  isLoading,
  refreshing,
  onRefresh,
}: BlocksContainerViewProps) {
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
      <BlocksList
        blocks={blocks}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ThemedBox >
  );
}

