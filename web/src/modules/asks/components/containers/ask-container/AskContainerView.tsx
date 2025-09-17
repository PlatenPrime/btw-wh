import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskActions } from "@/modules/asks/components/containers/ask-container/components/ask-actions/AskActions.tsx";
import { AskControlButtons } from "@/modules/asks/components/controls/ask-control-buttons/AskControlButtons.tsx";
import { AskDetails } from "@/modules/asks/components/containers/ask-container/components/ask-details/AskDetails.tsx";

interface AskContainerViewProps {
  askData: AskDto;
}

export function AskContainerView({ askData }: AskContainerViewProps) {
  return (
    <section className="grid gap-2">
      <AskControlButtons askData={askData} />

      <AskDetails askData={askData} />

      <AskActions actions={askData.actions} />
    </section>
  );
}
