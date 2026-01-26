import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskDetailsCard } from "@/modules/asks/components/cards/ask-details-card/AskDetailsCard";
import { AskEvents } from "@/modules/asks/components/containers/ask-container/components/ask-events/AskEvents";
import { AskPosesByArtikulContainer } from "@/modules/asks/components/containers/ask-poses-by-artikul-container";
import { AskPullPositionsContainer } from "@/modules/asks/components/containers/ask-pull-positions-container";
import { memo } from "react";

interface AskContainerViewProps {
  askData: AskDto;
}

export const AskContainerView = memo(function AskContainerView({
  askData,
}: AskContainerViewProps) {
  return (
    <section className="grid gap-2">
      <Wrapper className="grid gap-2 lg:grid-cols-2">
        <AskDetailsCard askData={askData} />
        <AskEvents
          events={askData.events ?? []}
          pullQuant={askData.pullQuant}
          pullBox={askData.pullBox}
          pullBoxes={askData.pullBoxes}
        />
      </Wrapper>

      {/* Позиции для снятия */}
      {askData.artikul ? (
        <Wrapper>
          <AskPullPositionsContainer askId={askData._id} />
        </Wrapper>
      ) : null}

      {/* Позиции по артикулу */}
      {askData.artikul ? (
        <Wrapper>
          <AskPosesByArtikulContainer
            artikul={askData.artikul}
            askId={askData._id}
          />
        </Wrapper>
      ) : null}
    </section>
  );
});
