import { ImageBlurContainer } from "@/components/image/image-blur-container";
import { Card, CardDescription } from "@/components/ui/card";
import { Link } from "react-router";
import type { ArtDto } from "../../types/dto";

interface GridCardProps {
  art: ArtDto;
}

export function GridCard({ art }: GridCardProps) {
  return (
    <Link to={`/arts/${art.artikul}`} className="block h-full w-full  ">
      <Card
        className="h-full p-0 bg-background transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
             shadow-none hover:shadow-2xl shadow-muted-foreground
             hover:scale-105 hover:-translate-y-1
             hover:z-10 
             ring-1 ring-gray-200 dark:ring-gray-700"
      >
        <ImageBlurContainer
          artikul={art.artikul}
          imgData={{ alt: art.nameukr }}
          className="h-full rounded-xl "
        >
          <CardDescription className="p-2 text-center text-foreground">
            {art.nameukr}
          </CardDescription>
        </ImageBlurContainer>
      </Card>
    </Link>
  );
}
