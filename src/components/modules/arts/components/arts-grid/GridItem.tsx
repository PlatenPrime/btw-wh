import { Image } from "@/components/image";
import { getSmallImageUrl } from "@/components/modules/arts/services/arts";
import type { Art } from "@/components/modules/arts/types/types";
import { Card, CardDescription } from "@/components/ui/card";
import { Link } from "react-router";

interface GridItemProps {
  art: Art;
}

export function GridItem({ art }: GridItemProps) {
  return (

      <Link to={`/arts/${art.artikul}`} className="w-full">
        <Card className=" w-full flex flex-row gap-2 px-2 py-2 items-center">
          <Image
            src={getSmallImageUrl(art.artikul)}
            alt={art.nameukr}
            className="w-16 object-fit rounded-md"
          />
          <CardDescription>{art.nameukr}</CardDescription>
        </Card>
      </Link>

  );
}
