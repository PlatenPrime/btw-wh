import { Image } from "@/components/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Art } from "./types/types";
import { Link } from "react-router";

export function ArtListCard({ art }: { art: Art }) {
  const bigImageUrl = `https://sharik.ua/images/elements_big/${art.artikul}_m1.jpg`;

  return (
    <Link to={`/arts/${art.artikul}`} className="block h-full w-full">
      <Card className="flex h-full flex-col justify-between">
        <CardHeader className="text-center">
          <CardTitle>{art.artikul}</CardTitle>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Image
            src={bigImageUrl}
            alt={art.nameukr}
            // квадратное превью без «прыжков» сетки
            className="aspect-square w-full max-w-[10rem] object-cover rounded-md"
          />
        </CardContent>

        <CardDescription className="p-2 text-center">
          {art.nameukr}
        </CardDescription>
      </Card>
    </Link>
  );
}
