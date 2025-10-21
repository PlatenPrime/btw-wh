import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridCardView } from "@/modules/arts/components/cards/arts-grid-card/ArtsGridCardView.tsx";

interface GridCardProps {
  art: ArtDto;
}

export function ArtsGridCard({ art }: GridCardProps) {
  const nameukr =
    art.nameukr.length > 50 ? art.nameukr.slice(0,47) + "..." : art.nameukr;

  return <ArtsGridCardView artikul={art.artikul} nameukr={nameukr} />;
}
