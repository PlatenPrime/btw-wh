import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskActions } from "./components/ask-actions/AskActions";
import { AskDetails } from "./components/ask-details/AskDetails";

interface AskContainerViewProps {
  askData: AskDto;
}

export function AskContainerView({ askData }: AskContainerViewProps) {
  return (
    <section className="grid gap-2">
      <AskDetails askData={askData} />

      <AskActions actions={askData.actions} />
    </section>
  );
}
