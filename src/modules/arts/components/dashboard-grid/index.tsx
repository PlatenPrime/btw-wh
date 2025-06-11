import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { ArtDto } from "../../types/dto";
import { GridCard } from "../dashboard-grid-card";
import { GridItem } from "../dashboard-list-item";

interface GridProps {
  arts: ArtDto[] | undefined;
}

export function Grid({ arts }: GridProps) {
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
          gap-2
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
