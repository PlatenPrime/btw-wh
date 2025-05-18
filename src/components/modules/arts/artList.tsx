import { ArtListResponsiveItem } from "./artListResponsiveItem";
import type { Art } from "./types/types";

export function ArtsList({ arts }: { arts: Art[] | undefined }) {
  if (!arts || arts.length === 0) {
    return <div>Артикулів не знайдено</div>;
  }


  return (
    <ul className="flex flex-wrap gap-2 justify-center  " >
      {arts.map((art) => (
          <ArtListResponsiveItem key={art.artikul} art={art} />
       
      ))}
    </ul>
  );
}
