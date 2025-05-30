// import { useMediaQuery } from "@/hooks/useMediaQuery";

import { Skeleton } from "@/components/ui/skeleton";

export function GridSkeleton() {
//   const isMobile = useMediaQuery("(max-width: 768px)");

const items = Array.from({ length: 10 }, (_, i) => i);

  return  <ul
      className="
        grid [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]
        gap-4
        auto-rows-[1fr]
      "
    >
      {items.map((_, i) => (
       <Skeleton key={i} className="aspect-square rounded-md" />
      ))}
    </ul>
}
