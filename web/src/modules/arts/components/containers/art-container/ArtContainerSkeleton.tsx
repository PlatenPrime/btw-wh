import { Container } from "@/components/shared/containers/Container";
import { ArtDetailCardSkeleton } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCardSkeleton";
import { ArtControlButtonsSkeleton } from "@/modules/arts/components/control/art-control-buttons/ArtControlButtonsSkeleton";
import { PosesByArtikulContainerSkeleton } from "@/modules/poses/components/containers/poses-by-artikul-container";

export function ArtContainerSkeleton() {
  return (
    <section className="grid gap-2">
      <Container className="flex w-full gap-2">
        <ArtDetailCardSkeleton />
        <ArtControlButtonsSkeleton />
      </Container>
      <PosesByArtikulContainerSkeleton />
    </section>
  );
}
