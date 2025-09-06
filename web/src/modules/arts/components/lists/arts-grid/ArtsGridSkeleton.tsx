import { cn } from "@/lib/utils";
import { ArtGridCardSkeleton } from "@/modules/arts/components/cards/arts-grid-card/ArtGridCardSkeleton";

export  function ArtsGridSkeleton() {
  return  <ul
  className={cn(
    "grid auto-rows-[1fr] gap-2",
    "grid-cols-1",
    "md:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] md:gap-4",
  )}
>
  {
    Array.from({ length: 20 }).map((_, i) => (
      <li key={i} className="flex">
        <ArtGridCardSkeleton />
      </li>
    ))}

</ul>;
}
