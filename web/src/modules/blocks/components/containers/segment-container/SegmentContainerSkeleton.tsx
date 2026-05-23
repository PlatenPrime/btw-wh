import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";
import { SegmentInfoCardSkeleton } from "@/modules/blocks/components/cards/segment-info-card";
import { ZoneBySegmentCardSkeleton } from "@/modules/blocks/components/cards/zone-by-segment-card";

export function SegmentContainerSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <SurfaceSection>
        <SegmentInfoCardSkeleton />
      </SurfaceSection>
      <SurfaceSection>
        <div className="flex flex-col gap-2">
          <ZoneBySegmentCardSkeleton />
          <ZoneBySegmentCardSkeleton />
        </div>
      </SurfaceSection>
    </div>
  );
}

