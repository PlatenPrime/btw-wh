import { getSmallImageUrl } from "@/lib/art-image-url";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridCardView } from "@/modules/arts/components/cards/arts-grid-card/ArtsGridCardView.tsx";

interface GridCardProps {
  art: ArtDto;
}

export function ArtsGridCard({ art }: GridCardProps) {
  const imageUrl = getSmallImageUrl(art.artikul); // можно и здесь вызывать

  return <ArtsGridCardView art={art} imageUrl={imageUrl} />;
}
