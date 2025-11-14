import { cn } from "@/lib/utils";
import { RowsGridCardSkeleton } from "@/modules/rows/components/cards/rows-grid-card/RowsGridCardSkeleton";

export function RowsGridSkeleton() {
  const skeletonItems = Array.from({ length: 16 }, (_, i) => i);

  return (
    <ul
      className={cn("grid gap-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4")}
    >
      {skeletonItems.map((index) => (
        <li key={index} className="flex">
          <RowsGridCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
