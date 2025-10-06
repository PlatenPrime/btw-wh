import { Image } from "@/components/shared/image/image";
import { ImageBlurContainer } from "@/components/shared/image/image-blur-container";
import { Card } from "@/components/ui/card";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { Link } from "react-router";

export function ArtsGridCardView({
  art,
  imageUrl,
}: {
  art: ArtDto;
  imageUrl: string;
}) {
  return (
    <Link to={`/arts/${art.artikul}`} className="block h-full w-full">
      <Card className="bg-background shadow-muted-foreground h-full p-0 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:shadow-2xl md:hover:-translate-y-1 md:hover:scale-105 dark:ring-gray-700">
        <ImageBlurContainer
          artikul={art.artikul}
          className="h-full rounded-xl p-1"
        >
          <div className="flex h-full items-center gap-2">
            <Image
              src={imageUrl}
              alt={art.nameukr}
              className="shadow-muted-foreground aspect-square w-8 rounded-lg object-cover shadow-md md:w-full md:max-w-[4rem]"
            />
            <div className="flex flex-col gap-1">
              <p className="text-foreground text-sm text-shadow-lg">
                {art.nameukr}
              </p>
              <p className="text-foreground text-xs text-rose-500  dark:text-rose-700">
                {art.limit}
              </p>
              <p className="text-foreground text-xs text-orange-500  dark:text-orange-700 ">
                {art.zone}
              </p>
            </div>
          </div>
        </ImageBlurContainer>
      </Card>
    </Link>
  );
}
