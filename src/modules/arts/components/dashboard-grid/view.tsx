import { cn } from "@/lib/utils";
import type { ArtDto } from "../../types/dto";
import { GridCard } from "../dashboard-grid-card";
import { GridItem } from "../dashboard-list-item";

interface ViewProps {
  isMobile: boolean;
  arts: ArtDto[] | undefined;
  isFetching?: boolean;
}

export function View({ isMobile, arts, }: ViewProps) {
  if (!arts || arts.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        Немає даних для відображення
      </div>
    );
  }

  return (
    <ul
       className={cn(
        "grid auto-rows-[1fr] gap-4",
        isMobile
          ? "grid-cols-1 gap-2"
          : "[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]",
        // isFetching && "opacity-50"
      )}
    >
      {arts.map((art) => (
        <li key={art.artikul} className="flex">
          {isMobile ? <GridItem art={art} /> : <GridCard art={art} />}
        </li>
      ))}
    </ul>
  );
}
