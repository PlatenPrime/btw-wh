import { useMediaQuery } from "@/hooks/useMediaQuery";
import { GridCardSkeleton } from "../dashboard-grid-card/skeleton";
import { GridItemSkeleton } from "../dashboard-list-item/skeleton";

export function GridSkeleton() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const items = Array.from({ length: 20 }, (_, i) => i);

  return (
    <ul
      className={`
        grid 
        ${isMobile
          ? "grid-cols-1"
          : "[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]"} 
        auto-rows-[1fr] 
        gap-4
      `}
    >
      {items.map((_, i) => (
        <li key={i} className="flex">
          {isMobile ? <GridItemSkeleton /> : <GridCardSkeleton />}
        </li>
      ))}
    </ul>
  );
}

