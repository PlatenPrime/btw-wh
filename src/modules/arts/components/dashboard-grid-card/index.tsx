import { Image } from "@/components/image";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Link } from "react-router";
import { getSmallImageUrl } from "../../services/art-image-url";
import type { ArtDto } from "../../types/dto";

interface GridCardProps {
  art: ArtDto;
}

export function GridCard({ art }: GridCardProps) {
  return (
    <Link to={`/arts/${art.artikul}`} className="block h-full w-full ">
      <Card className="flex h-full relative flex-col justify-between hover:scale-102 hover:shadow-2xl hover:shadow-gray-500 transition-all duration-300 p-2">
        {/* <CardHeader className="text-center">
          <CardTitle>{art.artikul}</CardTitle>
        </CardHeader> */}

        <div className="bg-red-500/10 absolute top-0 overflow-hidden flex justify-center blur opacity-10">
          {" "}
          <Image
            src={getSmallImageUrl(art.artikul)}
            alt={art.nameukr}
            // квадратное превью без «прыжков» сетки
            className="aspect-square w-[24rem]  object-cover rounded-md"
          />
        </div>
        <CardContent className="flex justify-center">
          <Image
            src={getSmallImageUrl(art.artikul)}
            alt={art.nameukr}
            // квадратное превью без «прыжков» сетки
            className="aspect-square w-full max-w-[6rem] object-cover rounded-md"
          />
        </CardContent>

        <CardDescription className="p-2 text-center">
          {art.nameukr}
        </CardDescription>
      </Card>
    </Link>
  );
}
