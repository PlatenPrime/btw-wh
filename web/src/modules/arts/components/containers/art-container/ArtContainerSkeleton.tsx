import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { ArtDetailCardSkeleton } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCardSkeleton";
import { PosesByArtikulContainerSkeleton } from "@/modules/poses/components/containers/poses-by-artikul-container";

export function ArtContainerSkeleton() {
  return (
    <section className="grid gap-2">
      <Wrapper>
        <ArtDetailCardSkeleton />
      </Wrapper>
      <PosesByArtikulContainerSkeleton />
    </section>
  );
}
