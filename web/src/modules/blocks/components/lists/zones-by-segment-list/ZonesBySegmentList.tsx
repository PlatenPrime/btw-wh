import { SurfaceSection } from "@/components/shared/layout";
import { LoadingNoData } from "@/components/shared/feedback/loading-states";
import { ZoneBySegmentCard } from "@/modules/blocks/components/cards/zone-by-segment-card";
import type { SegmentDto, ZoneWithSegmentDto } from "@/modules/blocks/api/types";

interface ZonesBySegmentListProps {
  segment: SegmentDto;
  zones: ZoneWithSegmentDto[];
}

export function ZonesBySegmentList({
  segment,
  zones,
}: ZonesBySegmentListProps) {
  if (zones.length === 0) {
    return (
      <SurfaceSection>
        <div className="grid gap-4 rounded-lg border border-dashed p-6 text-center">
          <LoadingNoData description="Цей сегмент не має зон" />
        </div>
      </SurfaceSection>
    );
  }

  return (
    <>
      {zones
        .filter((zone) => zone.title)
        .map((zone) => (
          <ZoneBySegmentCard key={zone._id} segment={segment} zone={zone} />
        ))}
    </>
  );
}

