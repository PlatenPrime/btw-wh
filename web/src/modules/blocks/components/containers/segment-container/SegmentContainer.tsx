import type { SegmentDto, ZoneWithSegmentDto } from "@/modules/blocks/api/types";
import { SegmentHeaderActions } from "@/modules/blocks/components/actions/segment-header-actions";
import { SegmentContainerView } from "./SegmentContainerView";

interface SegmentContainerProps {
  segment: SegmentDto;
  zones: ZoneWithSegmentDto[];
  isLoadingZones: boolean;
  zonesError: Error | null;
}

export function SegmentContainer({
  segment,
  zones,
  isLoadingZones,
  zonesError,
}: SegmentContainerProps) {
  return (
    <>
      <SegmentHeaderActions segment={segment} />
      <SegmentContainerView
        segment={segment}
        zones={zones}
        isLoadingZones={isLoadingZones}
        zonesError={zonesError}
      />
    </>
  );
}

