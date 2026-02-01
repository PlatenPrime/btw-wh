import type { AskDto } from "@/modules/asks/api/types/dto";
import { AsksListCardView } from "./AsksListCardView";

interface AsksListCardProps {
  ask: AskDto;
}

export function AsksListCard({ ask }: AsksListCardProps) {
  return <AsksListCardView ask={ask} />;
}
