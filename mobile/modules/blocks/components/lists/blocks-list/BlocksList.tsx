import type { BlockDto } from "@/modules/blocks/api/types";
import { BlocksListView } from "./BlocksListView";

interface BlocksListProps {
  blocks: BlockDto[] | undefined;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function BlocksList({
  blocks,
  refreshing,
  onRefresh,
}: BlocksListProps) {
  return (
    <BlocksListView
      blocks={blocks}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

