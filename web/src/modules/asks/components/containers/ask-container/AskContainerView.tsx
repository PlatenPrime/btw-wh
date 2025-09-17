import { Container } from "@/components/shared/container";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskActions } from "@/modules/asks/components/containers/ask-container/components/ask-actions/AskActions.tsx";
import { AskPosesByArtikulContainer } from "@/modules/asks/components/containers/ask-poses-by-artikul-container";
import { AskControlButtons } from "@/modules/asks/components/controls/ask-control-buttons/AskControlButtons.tsx";
import { AskDetailsCard } from "@/modules/asks/components/cards/ask-details-card/AskDetailsCard";

interface AskContainerViewProps {
  askData: AskDto;
}

export function AskContainerView({ askData }: AskContainerViewProps) {
  return (
    <section className="grid gap-2">
      <AskControlButtons askData={askData} />

      <Container className="grid gap-2 lg:grid-cols-2">
        <AskDetailsCard askData={askData} />

        <AskActions actions={askData.actions} />
      </Container>

      {/* Позиции по артикулу */}
      {askData.artikul && (
        <AskPosesByArtikulContainer
          artikul={askData.artikul}
          askId={askData._id}
        />
      )}
    </section>
  );
}
