import { ArtImage } from "./ArtImage";
import { ArtInfoContainer } from "./ArtInfoContainer";
import { BtradeArtInfoContainer } from "./BtradeArtInfoContainer";

export function ArtCard({ artikul }: { artikul: string | undefined }) {
  return (
    <article className="flex flex-col gap-4 p-4 border rounded-md shadow-sm">
      <ArtImage artikul={artikul} />
      <ArtInfoContainer artikul={artikul} />
      <BtradeArtInfoContainer artikul={artikul} />
    </article>
  );
}
