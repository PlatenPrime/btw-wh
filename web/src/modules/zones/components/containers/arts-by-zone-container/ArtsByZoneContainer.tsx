import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGrid } from "@/modules/arts/components/lists/arts-grid/ArtsGrid";

interface ArtsByZoneContainerProps {
  data: ArtDto[];
}

export function ArtsByZoneContainer({ data }: ArtsByZoneContainerProps) {
  return <ArtsGrid arts={data} />;
}
