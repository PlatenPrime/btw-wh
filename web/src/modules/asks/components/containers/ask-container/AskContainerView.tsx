import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskActions } from "@/modules/asks/components/containers/ask-container/components/ask-actions/AskActions.tsx";
import { AskDetails } from "@/modules/asks/components/containers/ask-container/components/ask-details/AskDetails.tsx";
import { AskPosesByArtikulContainer } from "@/modules/asks/components/containers/ask-poses-by-artikul-container";
import { AskControlButtons } from "@/modules/asks/components/controls/ask-control-buttons/AskControlButtons.tsx";

interface AskContainerViewProps {
  askData: AskDto;
}

export function AskContainerView({ askData }: AskContainerViewProps) {
  return (
    <section className="grid gap-4">
      <AskControlButtons askData={askData} />

      <AskDetails askData={askData} />

      <AskActions actions={askData.actions} />

      {/* Позиции по артикулу */}
      {askData.artikul && (
        <AskPosesByArtikulContainer artikul={askData.artikul} />
      )}
    </section>
  );
}
