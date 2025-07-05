import { cn } from "@/lib/utils";
import { GridCard } from "@/modules/arts/components/dashboard-infinite/grid-card";
import type { ArtDto } from "@/modules/arts/types/dto";

interface ViewProps {
  arts: ArtDto[] | undefined;
  isFetching?: boolean;
}

export function View({ arts }: ViewProps) {
  if (!arts || arts.length === 0) {
    return (
      <div className="text-muted-foreground text-center">
        Немає даних для відображення
      </div>
    );
  }

  return (
    <ul
      className={cn(
        "grid auto-rows-[1fr] gap-4",
        "grid-cols-1",
        "md:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]",
      )}
    >
      {arts.map((art) => (
        <li key={art.artikul} className="flex">
          <GridCard art={art} />
        </li>
      ))}
    </ul>
  );
}
