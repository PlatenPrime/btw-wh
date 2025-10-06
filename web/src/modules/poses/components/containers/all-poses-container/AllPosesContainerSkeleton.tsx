import { Skeleton } from "@/components/ui/skeleton";
import { PosInPalletCardSkeleton } from "@/modules/poses/components/cards/pos-in-pallet-card/PosInPalletCardSkeleton";

export function AllPosesContainerSkeleton() {
  return (
    <div className="grid gap-4">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Poses grid skeleton */}
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <PosInPalletCardSkeleton key={index} />
        ))}
      </section>
    </div>
  );
}
