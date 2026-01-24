import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { SegmentInfoCardSkeleton } from "@/modules/blocks/components/cards/segment-info-card";

export function SegmentContainerSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Wrapper>
        <SegmentInfoCardSkeleton />
      </Wrapper>
      <Wrapper>
        <Skeleton className="h-24 w-full" />
      </Wrapper>
    </div>
  );
}

