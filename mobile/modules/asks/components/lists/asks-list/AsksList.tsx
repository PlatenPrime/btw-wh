import type { AskDto } from "@/modules/asks/api/types/dto";
import { AsksListView } from "./AsksListView";

interface AsksListProps {
  asks: AskDto[];
}

export function AsksList({ asks }: AsksListProps) {
  return <AsksListView asks={asks} />;
}

