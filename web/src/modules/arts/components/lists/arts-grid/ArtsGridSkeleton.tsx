import { cn } from "@/lib/utils";
import { ArtGridCardSkeleton } from "@/modules/arts/components/cards/arts-grid-card/ArtGridCardSkeleton";

export function ArtsGridSkeleton() {
  return (
    <ul
      className={cn("grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4")}
    >
      {Array.from({ length: 20 }).map((_, i) => (
        <li key={i} className="flex">
          <ArtGridCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
