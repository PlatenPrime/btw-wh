import type { GetAsksByArtikulResponse } from "@/modules/asks/api/types/dto";
import { AsksByArtikulContainerView } from "./AsksByArtikulContainerView";

export interface AsksByArtikulContainerProps {
  data: GetAsksByArtikulResponse;
}

export function AsksByArtikulContainer({
  data,
}: AsksByArtikulContainerProps) {
  return <AsksByArtikulContainerView data={data} />;
}
