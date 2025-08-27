import { useParams } from "react-router";
import { ArtDetailView } from "./ArtDetailView";

export function ArtDetail() {
  const { artikul } = useParams<{ artikul: string }>();

  return <ArtDetailView artikul={artikul} />;
}
