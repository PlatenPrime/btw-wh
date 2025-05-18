import { ArtListCard } from "./artListCard";
import { ArtListItem } from "./artListItem";
import type { Art } from "./types/types";

export  function ArtsList({ arts }: { arts: Art[] | undefined }) {
  if (!arts || arts.length === 0) {
    return <div>Артикулів не знайдено</div>;
  }

  console.log(arts);
  
  return (
    <ul>
      <div className=" hidden md:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {arts.map((art) => (
      <ArtListCard key={art.artikul} art={art} />
      ))}
      </div>


        <div className="grid grid-cols-1  md:hidden gap-4">
          {arts.map((art) => (
            <ArtListItem key={art.artikul} art={art} />
          ))}
        </div>


      
    </ul>
  );
}
