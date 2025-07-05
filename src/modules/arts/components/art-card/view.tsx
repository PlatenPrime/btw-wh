import { ArtInfoContainer } from "../art-info";

export function ArtCard({ artikul }: { artikul: string | undefined }) {
  return (
    <article className="flex flex-col gap-2 rounded-md border p-4 shadow-sm">
      <ArtInfoContainer artikul={artikul} />
    </article>
  );
}
