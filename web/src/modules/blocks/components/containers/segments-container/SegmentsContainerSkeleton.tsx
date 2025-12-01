import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { SegmentCardSkeleton } from "@/modules/blocks/components/cards/segment-card";

export function SegmentsContainerSkeleton() {
  return (
    <Wrapper className="grid grid-cols-1 gap-2 p-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <SegmentCardSkeleton key={i} />
      ))}
    </Wrapper>
  );
}

