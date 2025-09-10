import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskContainerView } from "@/modules/asks/components/containers/ask-container/AskContainerView";

interface AskContainerProps {
  askData: AskDto;
}

export function AskContainer({ askData }: AskContainerProps) {


  console.log(askData);
  return <AskContainerView askData={askData} />;
}
