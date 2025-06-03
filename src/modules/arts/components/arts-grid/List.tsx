import type { ArtDto } from "../../types/dto";
import { GridItem } from "./GridItem";

interface ListProps {
  items: ArtDto[] | undefined;
}

export function List({ items }: ListProps) {
  return (
    <ul
      className="
      grid
        grid-cols-1
        gap-2
        auto-rows-[1fr]
      "
    >
      {items?.map((art) => (
        <li key={art.artikul} className="flex">
          <GridItem art={art} />
        </li>
      ))}
    </ul>
  );
}
