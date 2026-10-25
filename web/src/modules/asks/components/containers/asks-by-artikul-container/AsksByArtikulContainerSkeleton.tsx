import { Skeleton } from "@/components/ui/skeleton";
import { AsksByArtikulCardSkeleton } from "@/modules/asks/components/cards/asks-by-artikul-card";

export function AsksByArtikulContainerSkeleton() {
  return (
    <main className="grid gap-3">
      <Skeleton className="h-5 w-24" />

      <div className="grid gap-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <AsksByArtikulCardSkeleton key={index} />
        ))}
      </div>
    </main>
  );
}
