import type { ZoneWithSegmentDto } from "@/modules/blocks/api/types";
import { ZoneBySegmentCardView } from "./ZoneBySegmentCardView";

interface ZoneBySegmentCardProps {
  zone: ZoneWithSegmentDto;
}

export function ZoneBySegmentCard({ zone }: ZoneBySegmentCardProps) {
  return (
    <ZoneBySegmentCardView
      zoneId={zone._id}
      zoneTitle={zone.title}
      bar={zone.bar}
      sector={zone.sector}
    />
  );
}

