import ArtikulImageLink from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { ImageBlurContainer } from "@/components/shared/image/image-blur-container";
import { Card } from "@/components/ui/card";
import type { ArtDto } from "@/modules/arts/api/types/dto";

interface ArtsGridCardViewProps {
  artikul: ArtDto["artikul"];
  nameukr: ArtDto["nameukr"];
}

export function ArtsGridCardView({ artikul, nameukr }: ArtsGridCardViewProps) {
  return (
    <Card className=" shadow-muted-foreground h-full w-full p-0 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:shadow-2xl dark:ring-gray-700">
      <ImageBlurContainer artikul={artikul} className="h-full rounded-xl p-1">
        <ArtikulImageLink artikul={artikul} nameukr={nameukr} target="_self" />
      </ImageBlurContainer>
    </Card>
  );
}
