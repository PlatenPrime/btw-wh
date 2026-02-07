import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { SegmentInfoCardSkeleton } from "@/modules/blocks/components/cards/segment-info-card";
import { ZoneBySegmentCardSkeleton } from "@/modules/blocks/components/cards/zone-by-segment-card";

export function SegmentContainerSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Wrapper>
        <SegmentInfoCardSkeleton />
      </Wrapper>
      <Wrapper>
        <div className="flex flex-col gap-2">
          <ZoneBySegmentCardSkeleton />
          <ZoneBySegmentCardSkeleton />
        </div>
      </Wrapper>
    </div>
  );
}

