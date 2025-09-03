import type { AskDto } from "@/modules/asks/api/types/dto";
import { AsksListCard } from "../..";

interface AsksListViewProps {
  asks: AskDto[];
}

export function AsksListView({ asks }: AsksListViewProps) {
  return (
    <div className="grid gap-2">
      {asks.map((ask) => (
        <AsksListCard key={ask._id} ask={ask} />
      ))}
    </div>
  );
}
