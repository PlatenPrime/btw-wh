import { Skeleton } from "@/components/ui/skeleton";
import { AsksByArtikulCardSkeleton } from "@/modules/asks/components/cards/asks-by-artikul-card";

export function AsksByArtikulContainerSkeleton() {
  return (
    <main className="grid gap-2">
      {/* Скелетон статистики */}
      <div className="flex items-center gap-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-5 w-16" />
        ))}
      </div>

      {/* Скелетоны карточек */}
      <div className="grid gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <AsksByArtikulCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
