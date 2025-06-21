import { Image } from "@/components/image";
import { ImageBlurContainer } from "@/components/img-blur-container";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Link } from "react-router";
import { getSmallImageUrl } from "../../../../lib/art-image-url";
import type { ArtDto } from "../../types/dto";

interface GridCardProps {
  art: ArtDto;
}

export function GridCard({ art }: GridCardProps) {
  return (
    <Link to={`/arts/${art.artikul}`} className="block h-full w-full ">
      <Card className=" hover:scale-102 hover:shadow-2xl hover:shadow-gray-500 transition-all duration-300 p-0  ">
        {/* <CardHeader className="text-center">
          <CardTitle>{art.artikul}</CardTitle>
        </CardHeader> */}

        <ImageBlurContainer
          artikul={art.artikul}  
          className="flex h-full  flex-col justify-between"
        >
          <CardContent className="flex justify-center pt-2">
            <Image
              src={getSmallImageUrl(art.artikul)}
              alt={art.nameukr}
              // квадратное превью без «прыжков» сетки
              className="aspect-square w-full max-w-[6rem] object-cover rounded-md"
            />
          </CardContent>

          <CardDescription className="p-2 text-center text-foreground">
            {art.nameukr}
          </CardDescription>
        </ImageBlurContainer>
      </Card>
    </Link>
  );
}
