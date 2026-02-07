import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { LoadingNoData } from "@/components/shared/loading-states";
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
      <Wrapper>
        <div className="grid gap-4 rounded-lg border border-dashed p-6 text-center">
          <LoadingNoData description="Цей сегмент не має зон" />
        </div>
      </Wrapper>
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

