import { ArtInfoContainer } from "../art-info";

export function ArtCard({ artikul }: { artikul: string | undefined }) {
  return (
    <article className="flex flex-col gap-2 p-4 border rounded-md shadow-sm">
      <ArtInfoContainer artikul={artikul} />
    </article>
  );
}
