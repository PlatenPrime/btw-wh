import type { AskDto } from "@/modules/asks/api/types/dto";
import { AskDetailsCardView } from "@/modules/asks/components/cards/ask-details-card/AskDetailsCardView";

interface AskDetailsCardProps {
  askData: AskDto;
}

export function AskDetailsCard({ askData }: AskDetailsCardProps) {
  return <AskDetailsCardView askData={askData} />;
}
