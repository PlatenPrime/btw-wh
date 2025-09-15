import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskActions } from "./components/ask-actions/AskActions";
import { AskControlButtons } from "./components/ask-control-buttons/AskControlButtons";
import { AskDetails } from "./components/ask-details/AskDetails";

interface AskContainerViewProps {
  askData: AskDto;
}

export function AskContainerView({ askData }: AskContainerViewProps) {
  return (
    <section className="grid gap-4">
      <AskControlButtons askData={askData} />

      <AskDetails askData={askData} />

      <AskActions actions={askData.actions} />
    </section>
  );
}
