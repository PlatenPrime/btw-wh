import { cn } from "@/lib/utils";
import { GridCardSkeleton } from "@/modules/arts/components/dashboard-infinite/grid-card/skeleton";

export function GridSkeleton() {
  const items = Array.from({ length: 20 }, (_, i) => i);

  return (
    <ul
      className={cn(
        "grid auto-rows-[1fr] gap-4",
        "grid-cols-1 ",
        "md:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]"

      )}
    >
      {items.map((_, i) => (
        <li key={i} className="flex">
          <GridCardSkeleton />
        </li>
      ))}
    </ul>
  );
}
