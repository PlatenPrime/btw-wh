import type { GetAsksByDateResponse } from "@/modules/asks/api/types/dto";
import { AsksListEmpty } from "@/modules/asks/components/lists/asks-list/AsksListEmpty.tsx";
import { AsksListView } from "@/modules/asks/components/lists/asks-list/AsksListView.tsx";

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
