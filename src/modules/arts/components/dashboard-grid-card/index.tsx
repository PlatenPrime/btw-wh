import { ImageBlurContainer } from "@/components/image/image-blur-container";
import { Card, CardDescription } from "@/components/ui/card";
import { Link } from "react-router";
import type { ArtDto } from "../../types/dto";
import { Image } from "@/components/image/image";
import { getSmallImageUrl } from "@/lib/art-image-url";

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
             hover:scale-105 hover:-translate-y-1
             hover:z-10 
             ring-1 ring-gray-200 dark:ring-gray-700"
      >
        <ImageBlurContainer artikul={art.artikul} className="h-full rounded-xl">
          <div className="flex flex-col items-center justify-between h-full">
            <Image
              src={imageUrl}
              alt={art.nameukr}
              className="aspect-square w-full max-w-[6rem] object-cover rounded-md mt-2"
            />
            <CardDescription className="p-2 text-center text-foreground">
              {art.nameukr}
            </CardDescription>
          </div>
        </ImageBlurContainer>
      </Card>
    </Link>
  );
}

