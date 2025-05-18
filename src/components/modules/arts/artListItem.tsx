import { Image } from "@/components/image";
import type { Art } from "./types/types";
import { Card, CardDescription } from "@/components/ui/card";

export function ArtListItem({ art }: { art: Art }) {
  const smallImageUrl = `https://sharik.ua/images/elements_big_prev/prev_${art.artikul}_m1.jpg`;

  return (
    <Card className=" w-full flex flex-row gap-2 px-2 py-2 items-center">
      <Image
        src={smallImageUrl}
        alt={art.nameukr}
        className="w-16 object-fit rounded-md"
      />
       <CardDescription>{art.nameukr}</CardDescription>
    </Card>
  );
}
