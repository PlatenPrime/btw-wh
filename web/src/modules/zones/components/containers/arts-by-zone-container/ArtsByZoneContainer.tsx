import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsByZoneContainerView } from "@/modules/zones/components/containers/arts-by-zone-container/ArtsByZoneContainerView";

interface ArtsByZoneContainerProps {
  data: ArtDto[];
}

export function ArtsByZoneContainer({ data }: ArtsByZoneContainerProps) {
  return <ArtsByZoneContainerView data={data} />;
}
