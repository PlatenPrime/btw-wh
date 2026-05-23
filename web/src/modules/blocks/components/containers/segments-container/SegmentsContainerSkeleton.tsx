import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";
import { SegmentCardSkeleton } from "@/modules/blocks/components/cards/segment-card";

export function SegmentsContainerSkeleton() {
  return (
    <SurfaceSection className="grid grid-cols-1 gap-2 p-2">
      {Array.from({ length: 3 }).map((_, i) => (
        <SegmentCardSkeleton key={i} />
      ))}
    </SurfaceSection>
  );
}

