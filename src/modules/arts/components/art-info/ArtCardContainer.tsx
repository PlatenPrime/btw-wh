import { useParams } from "react-router";
import { ArtCard } from "./ArtCard";

export function ArtCardContainer() {
  const { artikul } = useParams<{ artikul: string }>();

  return <ArtCard artikul={artikul} />;
}
