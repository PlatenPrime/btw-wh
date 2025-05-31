import type { Art } from "../../types/types";
import { GridItem } from "./GridItem";

interface ListProps {
  items: Art[] | undefined;
}

export function List({ items }: ListProps) {
  return (
    <ul
      className="
      grid
        grid-cols-1
        gap-4
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
