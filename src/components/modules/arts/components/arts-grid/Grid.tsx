// components/ArtGrid.tsx
import { GridResponsiveItem } from "@/components/modules/arts/components/arts-grid/GridResponsiveItem";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Art } from "../../types/types";


interface ArtGridProps {
  arts: Art[] | undefined;
  isPending?: boolean;
}

export function Grid({ arts, isPending }: ArtGridProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (!arts || arts.length === 0) {
    return <div>Артикулів не знайдено</div>;
  }

  return (
    <ul
      className="
      grid [grid-template-columns:repeat(auto-fill,minmax(220px,1fr))]
      gap-4
      auto-rows-[1fr]
    "
    >
      {isPending && <p>Завантаження...</p>}
      {arts.map((art) => (
        <li key={art.artikul} className="flex">
          <GridResponsiveItem isPending={isPending} art={art} isMobile={isMobile} />
        </li>
      ))}
    </ul>
  );
}
