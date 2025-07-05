import { Image } from "@/components/image/image";
import { ImageBlurContainer } from "@/components/image/image-blur-container";
import { Card, CardDescription } from "@/components/ui/card";
import { getSmallImageUrl } from "@/lib/art-image-url";
import type { ArtDto } from "@/modules/arts/types/dto";
import { Link } from "react-router";

interface GridCardProps {
  art: ArtDto;
}

export function GridCard({ art }: GridCardProps) {
  const imageUrl = getSmallImageUrl(art.artikul); // можно и здесь вызывать

  return (
    <Link to={`/arts/${art.artikul}`} className="block h-full w-full">
      <Card className="bg-background shadow-muted-foreground h-full p-0 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:shadow-2xl md:hover:-translate-y-1 md:hover:scale-105 dark:ring-gray-700">
        <ImageBlurContainer artikul={art.artikul} className="h-full rounded-xl">
          <div className="flex h-full items-center md:flex-col md:justify-between md:pt-2">
            <Image
              src={imageUrl}
              alt={art.nameukr}
              className="shadow-muted-foreground aspect-square w-full max-w-[6rem] rounded-lg object-cover shadow-md"
            />
            <CardDescription className="text-foreground p-2 md:text-center">
              {art.nameukr}
            </CardDescription>
          </div>
        </ImageBlurContainer>
      </Card>
    </Link>
  );
}
