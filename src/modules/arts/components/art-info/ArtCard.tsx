import { Image } from "@/components/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getBigImageUrl } from "../../services/arts";
import type { ArtDto } from "../../types/dto";

export function ArtCard({ artikul }: { artikul: ArtDto | undefined }) {
  return (
    <Card className="flex h-full flex-col justify-between">
      <CardHeader className="text-center">
        <CardTitle>{artikul?.artikul}</CardTitle>
      </CardHeader>

      <CardContent className="flex justify-center">
        <Image
          src={getBigImageUrl(artikul?.artikul) ?? ""}
          alt={artikul?.nameukr}
          // квадратное превью без «прыжков» сетки
          className="aspect-square w-full max-w-[10rem] object-cover rounded-md"
        />
      </CardContent>

      <CardDescription className="p-2 text-center">
        {artikul?.nameukr}
      </CardDescription>
    </Card>
  );
}
