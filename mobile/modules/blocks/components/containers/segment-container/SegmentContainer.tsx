import type { SegmentDto, ZoneWithSegmentDto } from "@/modules/blocks/api/types";
import { SegmentContainerView } from "./SegmentContainerView";

interface SegmentContainerProps {
  segment: SegmentDto;
  zones: ZoneWithSegmentDto[] | undefined;
  isLoadingZones: boolean;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function SegmentContainer({
  segment,
  zones,
  isLoadingZones,
  refreshing,
  onRefresh,
}: SegmentContainerProps) {
  return (
    <SegmentContainerView
      segment={segment}
      zones={zones}
      isLoadingZones={isLoadingZones}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}

