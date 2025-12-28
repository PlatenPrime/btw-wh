import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsByZoneContainerView } from "./ArtsByZoneContainerView";

interface ArtsByZoneContainerProps {
  data: ArtDto[];
  total: number;
}

export function ArtsByZoneContainer({
  data,
  total,
}: ArtsByZoneContainerProps) {
  return <ArtsByZoneContainerView data={data} total={total} />;
}

