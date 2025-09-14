import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCard } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCard";
import { PosesByArtikulContainer } from "@/modules/arts/components/containers/poses-by-artikul-container";

interface ArtContainerViewProps {
  artData: ArtDto;
}

export function ArtContainerView({ artData }: ArtContainerViewProps) {
  return (
    <section className="flex flex-col gap-6">
      <ArtDetailCard artData={artData} />
      <PosesByArtikulContainer artikul={artData.artikul} />
    </section>
  );
}
