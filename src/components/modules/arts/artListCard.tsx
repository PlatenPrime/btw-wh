import { Image } from "@/components/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Art } from "./types/types";

export function ArtListCard({ art }: { art: Art }) {

  const bigImageUrl = `https://sharik.ua/images/elements_big/${art.artikul}_m1.jpg`;

  return (
    <Card className="max-w-xs">
      <CardHeader>
        <CardTitle>{art.nameukr}</CardTitle>
      </CardHeader>
      <CardContent>
        <Image
          src={bigImageUrl}
          alt={art.nameukr}
          className="w-full object-fit rounded-md"
        />
        <p className="mt-2 text-sm text-gray-600">Артикул: {art.artikul}</p>
      </CardContent>
    </Card>
  );
}
