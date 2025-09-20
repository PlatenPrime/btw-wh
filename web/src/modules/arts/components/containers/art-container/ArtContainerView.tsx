import { Container } from "@/components/shared/container";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtDetailCard } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCard";
import { PosesByArtikulContainer } from "@/modules/arts/components/containers/poses-by-artikul-container";
import { ArtControlButtons } from "../../control/art-control-buttons/ArtControlButtons";

interface ArtContainerViewProps {
  artData: ArtDto;
}

export function ArtContainerView({ artData }: ArtContainerViewProps) {
  return (
    <section className="grid gap-2">
      <Container className="flex w-full gap-2">
        <ArtDetailCard artData={artData} />
        <ArtControlButtons artData={artData} />
      </Container>
      <PosesByArtikulContainer artikul={artData.artikul} />
    </section>
  );
}
