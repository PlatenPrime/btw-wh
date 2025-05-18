import { Image } from "@/components/image";
import type { Art } from "./types/types";

export function ArtListItem({ art }: { art: Art }) {
  const smallImageUrl = `https://sharik.ua/images/elements_big_prev/prev_${art.artikul}_m1.jpg`;

  return (
    <li className="flex gap-2 ">
      <Image
        src={smallImageUrl}
        alt={art.nameukr}
        className="w-8 object-fit rounded-md"
      />
      <p className="mt-2 text-sm text-gray-600">Артикул: {art.artikul}</p>
    </li>
  );
}
