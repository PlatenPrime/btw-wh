import { Image } from "@/components/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router";
import { getBigImageUrl } from "../../services/arts";
import type { Art } from "../../types/types";

interface GridCardProps {
  art: Art;
}

export function GridCard({ art }: GridCardProps) {
  return (
    <Link to={`/arts/${art.artikul}`} className="block h-full w-full">
      <Card className="flex h-full flex-col justify-between">
        <CardHeader className="text-center">
          <CardTitle>{art.artikul}</CardTitle>
        </CardHeader>

        <CardContent className="flex justify-center">
          <Image
            src={getBigImageUrl(art.artikul)}
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
