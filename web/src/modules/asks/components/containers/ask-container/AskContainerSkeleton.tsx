import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { AskDetailsCardSkeleton } from "@/modules/asks/components/cards/ask-details-card/AskDetailsCardSkeleton";
import { AskEventsSkeleton } from "@/modules/asks/components/containers/ask-container/components/ask-events/AskEventsSkeleton";
import { AskPullPositionsContainerSkeleton } from "@/modules/asks/components/containers/ask-pull-positions-container/AskPullPositionsContainerSkeleton";
import { PosesByArtikulContainerSkeleton } from "@/modules/poses/components/containers/poses-by-artikul-container";

export function AskContainerSkeleton() {
  return (
    <section className="grid gap-2">
      <Wrapper className="grid gap-2 lg:grid-cols-2">
        <AskDetailsCardSkeleton />
        <AskEventsSkeleton />
      </Wrapper>

      <Wrapper>
        <AskPullPositionsContainerSkeleton />
      </Wrapper>
      <Wrapper>
        <PosesByArtikulContainerSkeleton />
      </Wrapper>
    </section>
  );
}
