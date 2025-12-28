import type { BlockDto } from "@/modules/blocks/api/types";
import { BlocksContainerView } from "./BlocksContainerView";

interface BlocksContainerProps {
  blocks: BlockDto[] | undefined;
  isLoading: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function BlocksContainer({
  blocks,
  isLoading,
  refreshing,
  onRefresh,
}: BlocksContainerProps) {
  return (
    <BlocksContainerView
      blocks={blocks}
      isLoading={isLoading}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

