import { Container } from "@/components/shared/containers/Container";
import { AskDetailsCardSkeleton } from "@/modules/asks/components/cards/ask-details-card/AskDetailsCardSkeleton";
import { AskEventsSkeleton } from "@/modules/asks/components/containers/ask-container/components/ask-events/AskEventsSkeleton";
import { PosesByArtikulContainerSkeleton } from "@/modules/poses/components/containers/poses-by-artikul-container";

export function AskContainerSkeleton() {
  return (
    <section className="grid gap-2">
      <Container className="grid gap-2 lg:grid-cols-2">
        <AskDetailsCardSkeleton />
        <AskEventsSkeleton />
      </Container>

      <PosesByArtikulContainerSkeleton />
    </section>
  );
}
