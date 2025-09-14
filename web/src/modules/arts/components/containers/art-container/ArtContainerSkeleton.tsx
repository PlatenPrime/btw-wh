import { Skeleton } from "@/components/ui/skeleton";
import { ArtDetailCardSkeleton } from "@/modules/arts/components/cards/art-detail-card/ArtDetailCardSkeleton";

export function ArtContainerSkeleton() {
  return (
    <section className="flex flex-col gap-6">
      <ArtDetailCardSkeleton />

      {/* Скелетон для секции позиций */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
    </section>
  );
}
