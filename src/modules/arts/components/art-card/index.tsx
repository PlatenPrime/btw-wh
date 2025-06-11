import { useParams } from "react-router";
import { ArtCard } from "./view";

export function ArtCardContainer() {
  const { artikul } = useParams<{ artikul: string }>();

  return <ArtCard artikul={artikul} />;
}
