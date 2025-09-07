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
        "grid auto-rows-[1fr] gap-2",
        "grid-cols-1",
        "md:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] md:gap-4",
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
