import { Container } from "@/components/shared/container";
import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskDetailsCard } from "@/modules/asks/components/cards/ask-details-card/AskDetailsCard";
import { AskActions } from "@/modules/asks/components/containers/ask-container/components/ask-actions/AskActions.tsx";
import { AskPosesByArtikulContainer } from "@/modules/asks/components/containers/ask-poses-by-artikul-container";
import { AskControlButtons } from "@/modules/asks/components/controls/ask-control-buttons/AskControlButtons.tsx";

interface AskContainerViewProps {
  askData: AskDto;
}

export function AskContainerView({ askData }: AskContainerViewProps) {
  return (
    <section className="grid gap-2">
      <Container className="grid gap-2 lg:grid-cols-2">
        <div className="flex gap-2 w-full" >
          <AskDetailsCard askData={askData} />
          <AskControlButtons askData={askData} />
        </div>
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
