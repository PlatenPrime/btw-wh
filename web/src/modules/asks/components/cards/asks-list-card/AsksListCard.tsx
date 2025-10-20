import type { AskDto } from "@/modules/asks/api/types/dto";
import { AsksListCardView } from "@/modules/asks/components/cards/asks-list-card/AsksListCardView.tsx";

interface AsksListCardProps {
  ask: AskDto;
}

export function AsksListCard({ ask }: AsksListCardProps) {
  return <AsksListCardView ask={ask} statusText={ask.status} />;
}
