import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGrid } from "@/modules/arts/components/lists/arts-grid/ArtsGrid";

interface ArtsByZoneContainerViewProps {
  data: ArtDto[];
}

export function ArtsByZoneContainerView({ data }: ArtsByZoneContainerViewProps) {
  return <ArtsGrid arts={data} />;
}
