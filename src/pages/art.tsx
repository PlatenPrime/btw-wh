import { ArtCardContainer } from "@/components/modules/arts/ArtCardContainer";
import { BtradeArtInfoContainer } from "@/components/modules/arts/BtradeArtInfoContainer";

export function Art() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Art Page</h1>
      <ArtCardContainer />
      <BtradeArtInfoContainer />
    </div>
  );
}
