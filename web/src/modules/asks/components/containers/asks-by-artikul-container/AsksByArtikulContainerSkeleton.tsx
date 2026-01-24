import { Skeleton } from "@/components/ui/skeleton";
import { AsksByArtikulCardSkeleton } from "@/modules/asks/components/cards/asks-by-artikul-card";

export function AsksByArtikulContainerSkeleton() {
  return (
    <main className="grid gap-2">
      {/* Скелетон заголовка */}
      <Skeleton className="h-7 w-24 mx-auto" />

      {/* Скелетоны карточек */}
      <div className="grid gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <AsksByArtikulCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
