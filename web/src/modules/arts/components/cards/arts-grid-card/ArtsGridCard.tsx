import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridCardView } from "@/modules/arts/components/cards/arts-grid-card/ArtsGridCardView.tsx";

interface GridCardProps {
  art: ArtDto;
}

export function ArtsGridCard({ art }: GridCardProps) {
  const rawNameukr = art.nameukr ?? "";
  const nameukr =
    rawNameukr.length > 50 ? rawNameukr.slice(0, 47) + "..." : rawNameukr;

  return (
    <ArtsGridCardView
      artikul={art.artikul}
      nameukr={nameukr}
      prodName={art.prodName}
    />
  );
}
