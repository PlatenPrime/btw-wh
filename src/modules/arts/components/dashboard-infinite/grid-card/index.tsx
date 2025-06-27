import { Image } from "@/components/image/image";
import { ImageBlurContainer } from "@/components/image/image-blur-container";
import { Card, CardDescription } from "@/components/ui/card";
import { getSmallImageUrl } from "@/lib/art-image-url";
import { Link } from "react-router";
import type { ArtDto } from "@/modules/arts/types/dto";

interface GridCardProps {
  art: ArtDto;
}

export function GridCard({ art }: GridCardProps) {
  const imageUrl = getSmallImageUrl(art.artikul); // можно и здесь вызывать

  return (
    <Link to={`/arts/${art.artikul}`} className="block h-full w-full">
      <Card
        className="h-full p-0 bg-background transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
             shadow-none hover:shadow-2xl shadow-muted-foreground
             md:hover:scale-105 md:hover:-translate-y-1
             hover:z-10 
             ring-1 ring-gray-200 dark:ring-gray-700"
      >
        <ImageBlurContainer artikul={art.artikul} className="h-full rounded-xl">
          <div className="flex  md:flex-col md:pt-2 items-center md:justify-between h-full">
            <Image
              src={imageUrl}
              alt={art.nameukr}
              className="aspect-square w-full max-w-[6rem] object-cover rounded-lg shadow-md shadow-muted-foreground "
            />
            <CardDescription className="p-2 md:text-center text-foreground">
              {art.nameukr}
            </CardDescription>
          </div>
        </ImageBlurContainer>
      </Card>
    </Link>
  );
}
