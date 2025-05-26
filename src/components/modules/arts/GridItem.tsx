import { Image } from "@/components/image";
import { Card, CardDescription } from "@/components/ui/card";
import { Link } from "react-router";
import type { Art } from "./types/types";
import { getSmallImageUrl } from "./services/arts";

export function ArtListItem({ art }: { art: Art }) {

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
