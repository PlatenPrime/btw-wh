import type { BlockDto, SegmentDto } from "@/modules/blocks/api/types";
import { BlockContainerView } from "./BlockContainerView";

interface BlockContainerProps {
  block: BlockDto;
  segments: SegmentDto[] | undefined;
  isLoadingSegments: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function BlockContainer({
  block,
  segments,
  isLoadingSegments,
  refreshing,
  onRefresh,
}: BlockContainerProps) {
  return (
    <BlockContainerView
      block={block}
      segments={segments}
      isLoadingSegments={isLoadingSegments}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

