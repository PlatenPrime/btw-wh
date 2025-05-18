import type { Art } from "./types/types";

export function ArtCard({ art }: { art: Art }) {
  return (
    <li key={art._id}>
      {" "}
      <strong>{art.artikul}</strong> – {art.nameukr}
    </li>
  );
}
