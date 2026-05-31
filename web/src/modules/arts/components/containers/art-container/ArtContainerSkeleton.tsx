import { SurfaceSection } from "@/components/shared/layout";
import { ArtDetailCardSkeleton } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCardSkeleton";
import { PosesByArtikulContainerSkeleton } from "@/modules/poses/components/containers/poses-by-artikul-container";
import { AsksByArtikulContainerSkeleton } from "@/modules/asks/components/containers/asks-by-artikul-container";

export function ArtContainerSkeleton() {
  return (
    <section className="grid gap-2">
      <SurfaceSection>
        <ArtDetailCardSkeleton />
      </SurfaceSection>

      <SurfaceSection>
        <PosesByArtikulContainerSkeleton />
      </SurfaceSection>

      <SurfaceSection>
        <AsksByArtikulContainerSkeleton />
      </SurfaceSection>
    </section>
  );
}
