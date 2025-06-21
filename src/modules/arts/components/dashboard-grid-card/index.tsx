import { ImageBlurContainer } from "@/components/img-blur-container";
import { Card, CardDescription } from "@/components/ui/card";
import { Link } from "react-router";
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
          preview={{ alt: art.nameukr }}
          className="h-full"
        >
          <CardDescription className="p-2 text-center text-foreground">
            {art.nameukr}
          </CardDescription>
        </ImageBlurContainer>
      </Card>
    </Link>
  );
}
