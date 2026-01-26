import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskHeaderActions } from "@/modules/asks/components/actions/ask-header-actions";
import { AskContainerView } from "@/modules/asks/components/containers/ask-container/AskContainerView";

interface AskContainerProps {
  askData: AskDto;
}

export function AskContainer({ askData }: AskContainerProps) {
  return (
    <>
      <AskHeaderActions askData={askData} />
      <AskContainerView askData={askData} />
    </>
  );
}
