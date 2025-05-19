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
    <Link to={`/arts/${art.artikul}`} className="">
    <Card className="max-w-xs flex flex-col justify-between ">
      <CardHeader className="text-center">
        <CardTitle>{art.artikul}</CardTitle>
        <CardDescription>{art.nameukr}</CardDescription>
      </CardHeader>

      <CardContent>
        <Image
          src={bigImageUrl}
          alt={art.nameukr}
          className="w-40 object-fit rounded-md "
        />
      </CardContent>

    </Card>
    </Link>
  );
}
