import { ThemedBox } from "@/components/themed";
import type { BlockDto, SegmentDto } from "@/modules/blocks/api/types";
import { BlockInfo } from "@/modules/blocks/components/elements/block-info";
import { SegmentsList } from "@/modules/blocks/components/lists/segments-list";
import { ThemedText } from "@/components/themed/themed-text";

interface BlockContainerViewProps {
  block: BlockDto;
  segments: SegmentDto[] | undefined;
  isLoadingSegments: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function BlockContainerView({
  block,
  segments,
  isLoadingSegments,
  refreshing,
  onRefresh,
}: BlockContainerViewProps) {
  return (
    <ThemedBox className="flex-1">
      {isLoadingSegments ? (
        <ThemedBox className="flex-1 justify-center items-center py-8">
          <ThemedText type="default" className="text-center">
            Завантаження сегментів...
          </ThemedText>
        </ThemedBox>
      ) : (
        <SegmentsList
          segments={segments}
          blockId={block._id}
          refreshing={refreshing}
          onRefresh={onRefresh}
          headerComponent={<BlockInfo block={block} />}
        />
      )}
    </ThemedBox>
  );
}

