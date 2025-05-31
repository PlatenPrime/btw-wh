import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Art } from "../../types/types";
import { GridCard } from "./GridCard";
import { GridItem } from "./GridItem";

interface ArtGridProps {
  arts: Art[] | undefined;
}

export function Grid({ arts }: ArtGridProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!arts || arts.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Немає даних для відображення
      </div>
    );
  }

  return (
    <ul
      className={`
          grid 
          ${
            isMobile
              ? "grid-cols-1"
              : "[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]"
          } 
          auto-rows-[1fr] 
          gap-4
        `}
    >
      {arts.map((art) => (
        <li key={art.artikul} className="flex">
          {isMobile ? <GridItem art={art} /> : <GridCard art={art} />}
        </li>
      ))}
    </ul>
  );
}
