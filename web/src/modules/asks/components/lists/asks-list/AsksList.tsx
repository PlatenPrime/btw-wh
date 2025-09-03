import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { AsksListEmpty } from "./AsksListEmpty";
import { AsksListView } from "./AsksListView";

interface AsksProps {
  data: GetAsksByDateResponse;
  selectedDate: Date;
}

export function AsksList({ data, selectedDate }: AsksProps) {
  if (data.data.length === 0) {
    return <AsksListEmpty selectedDate={selectedDate} />;
  }

  return <AsksListView asks={data.data} />;
}
