import type { Art } from "./types/types";

export  function ArtsList({ arts }: { arts: Art[] | undefined }) {
  if (!arts || arts.length === 0) {
    return <div>Артикулів не знайдено</div>;
  }
  return (
    <ul>
      {arts.map((art) => (
        <li key={art._id}>
          <strong>{art.artikul}</strong> – {art.nameukr}
        </li>
      ))}
    </ul>
  );
}
