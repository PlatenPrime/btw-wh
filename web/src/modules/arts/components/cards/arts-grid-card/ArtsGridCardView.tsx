import { ArtikulImageLink } from "@/components/shared/media/artikul-image-link/ArtikulImageLink";
import { GridTileCard } from "@/components/shared/cards";
import { ImageBlurContainer } from "@/components/shared/media/image/ImageBlurContainer";

interface ArtsGridCardViewProps {
  artikul: string;
  nameukr: string;
}

export function ArtsGridCardView({ artikul, nameukr }: ArtsGridCardViewProps) {
  return (
    <GridTileCard className="h-full w-full gap-1 p-0">
      <ImageBlurContainer artikul={artikul} className="h-full rounded-xl p-1">
        <ArtikulImageLink artikul={artikul} nameukr={nameukr} target="_self" />
      </ImageBlurContainer>
    </GridTileCard>
  );
}
