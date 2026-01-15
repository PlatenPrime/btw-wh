import type { AskDto } from "@/modules/asks/api/types/dto";
import { AsksByArtikulCardView } from "./AsksByArtikulCardView";

interface AsksByArtikulCardProps {
  ask: AskDto;
}

export function AsksByArtikulCard({ ask }: AsksByArtikulCardProps) {
  return <AsksByArtikulCardView ask={ask} />;
}
