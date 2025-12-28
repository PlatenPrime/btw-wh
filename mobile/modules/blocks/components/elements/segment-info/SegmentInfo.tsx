import type { SegmentDto } from "@/modules/blocks/api/types";
import { SegmentInfoView } from "./SegmentInfoView";

interface SegmentInfoProps {
  segment: SegmentDto;
}

export function SegmentInfo({ segment }: SegmentInfoProps) {
  return (
    <SegmentInfoView
      order={segment.order}
      sector={segment.sector}
      zonesCount={segment.zones.length}
      blockTitle={segment.blockData.title}
    />
  );
}

