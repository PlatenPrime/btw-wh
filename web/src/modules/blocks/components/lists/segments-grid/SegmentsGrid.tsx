import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { SegmentDto } from "@/modules/blocks/api/types";
import { SegmentCard } from "@/modules/blocks/components/cards/segment-card";

interface SegmentsGridProps {
  segments: SegmentDto[];
  blockId: string;
  onDelete?: (segment: SegmentDto) => void;
}

export function SegmentsGrid({ segments, blockId, onDelete }: SegmentsGridProps) {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {segments.map((segment) => (
        <SegmentCard key={segment._id} segment={segment} blockId={blockId} onDelete={onDelete} />
      ))}
    </Wrapper>
  );
}

