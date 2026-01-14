import type { GetAsksByArtikulResponse } from "@/modules/asks/api/types/dto";
import { AsksByArtikulContainerView } from "@/modules/asks/components/containers/asks-by-artikul-container/AsksByArtikulContainerView";

export interface AsksByArtikulContainerProps {
  data: GetAsksByArtikulResponse;
}

export function AsksByArtikulContainer({
  data,
}: AsksByArtikulContainerProps) {
  return <AsksByArtikulContainerView data={data} />;
}
