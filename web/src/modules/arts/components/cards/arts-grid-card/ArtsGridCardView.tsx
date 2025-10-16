import ArtikulImageLink from "@/components/shared/artikul-image-link/ArtikulImageLink";
import { ImageBlurContainer } from "@/components/shared/image/image-blur-container";
import { Card } from "@/components/ui/card";
import type { ArtDto } from "@/modules/arts/api/types/dto";

export function ArtsGridCardView({ art }: { art: ArtDto }) {
  return (
    <Card className="bg-background shadow-muted-foreground h-full p-0 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:shadow-2xl dark:ring-gray-700">
      <ImageBlurContainer
        artikul={art.artikul}
        className="h-full rounded-xl p-1"
      >
        <ArtikulImageLink artikul={art.artikul} nameukr={art.nameukr}  />
      </ImageBlurContainer>
    </Card>
  );
}
