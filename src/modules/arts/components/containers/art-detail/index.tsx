import { useParams } from "react-router";
import { ArtDetailView } from "./view";

export function ArtDetail() {
  const { artikul } = useParams<{ artikul: string }>();

  return <ArtDetailView artikul={artikul} />;
}
