import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCardView } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCardView";

interface ArtDetailCardProps {
  artData: ArtDto;
}

export function ArtDetailCard({ artData }: ArtDetailCardProps) {
  return <ArtDetailCardView artData={artData} />;
}
