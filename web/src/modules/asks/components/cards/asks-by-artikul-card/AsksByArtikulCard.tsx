import type { AskDto } from "@/modules/asks/api/types/dto";
import { AsksByArtikulCardView } from "@/modules/asks/components/cards/asks-by-artikul-card/AsksByArtikulCardView";

export interface AsksByArtikulCardProps {
  ask: AskDto;
}

export function AsksByArtikulCard({ ask }: AsksByArtikulCardProps) {
  return <AsksByArtikulCardView ask={ask} />;
}
