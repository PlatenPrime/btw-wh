import { cn } from "@/lib/utils";
import type { ArtDto } from "@/modules/arts/api/types/dto";
import { ArtsGridCard } from "@/modules/arts/components/cards/arts-grid-card/ArtsGridCard";

interface ViewProps {
  arts: ArtDto[] | undefined;
}

export function ArtsGridView({ arts }: ViewProps) {
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
       "grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      )}
    >
      {arts &&
        arts.map((art) => (
          <li key={art.artikul} className="flex">
            <ArtsGridCard art={art} />
          </li>
        ))}
    </ul>
  );
}
