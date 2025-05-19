import { Image } from "@/components/image";
import { Card, CardTitle } from "@/components/ui/card";
import type { Art } from "./types/types";
import { Link } from "react-router";

export function ArtListItem({ art }: { art: Art }) {
  const smallImageUrl = `https://sharik.ua/images/elements_big_prev/prev_${art.artikul}_m1.jpg`;

  return (
    <Link to={`/arts/${art.artikul}`} className="w-full"> 
    <Card className=" w-full flex flex-row gap-2 px-2 py-2 items-center">
      <Image
        src={smallImageUrl}
        alt={art.nameukr}
        className="w-16 object-fit rounded-md"
      />
      <CardTitle>{art.nameukr}</CardTitle>
    </Card>
    </Link>
  );
}
