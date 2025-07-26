import { getSmallImageUrl } from "@/lib/art-image-url";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridCardView } from "./view";

interface GridCardProps {
  art: ArtDto;
}

export function ArtsGridCard({ art }: GridCardProps) {
  const imageUrl = getSmallImageUrl(art.artikul); // можно и здесь вызывать

  return <ArtsGridCardView art={art} imageUrl={imageUrl} />;
}
