import { cn } from "@/lib/utils";
import { RowsGridCardSkeleton } from "@/modules/rows/components/cards/rows-grid-card/RowsGridCardSkeleton";

export function RowsGridSkeleton() {
  const skeletonItems = Array.from({ length: 15 }, (_, i) => i);

  return (
    <ul
      className={cn(
        "grid auto-rows-[1fr] gap-2",
        "grid-cols-1",
        "md:[grid-template-columns:repeat(auto-fill,minmax(280px,1fr))] md:gap-4",
      )}
    >
      {skeletonItems.map((index) => (
        <li key={index} className="flex">
          <RowsGridCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
