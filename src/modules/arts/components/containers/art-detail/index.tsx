import { useParams } from "react-router";
import { ArtDetail } from "./view";

export function ArtCardContainer() {
  const { artikul } = useParams<{ artikul: string }>();

  return <ArtDetail artikul={artikul} />;
}
