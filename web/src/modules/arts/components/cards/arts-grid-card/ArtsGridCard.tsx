import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridCardView } from "@/modules/arts/components/cards/arts-grid-card/ArtsGridCardView.tsx";

interface GridCardProps {
  art: ArtDto;
}

export function ArtsGridCard({ art }: GridCardProps) {
  return <ArtsGridCardView art={art} />;
}
