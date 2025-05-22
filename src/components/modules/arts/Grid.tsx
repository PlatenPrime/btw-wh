// components/ArtGrid.tsx
import { ArtListResponsiveItem } from "@/components/modules/arts/GridResponsiveItem";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import type { Art } from "./types/types";

interface ArtGridProps {
  arts: Art[] | undefined;
 
}

export function Grid ({ arts }: ArtGridProps) {
  
    const isMobile = useMediaQuery('(max-width: 768px)')
  
  
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
    {arts.map((art) => (
      <li key={art.artikul} className="flex">
        <ArtListResponsiveItem art={art} isMobile={isMobile} />
      </li>
    ))}
  </ul>
);
} 
