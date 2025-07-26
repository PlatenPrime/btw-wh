import { useOneArtQuery } from "@/modules/arts/api/hooks/useOneArtQuery";
import { ArtInfoSkeleton } from "./skeleton";
import { ArtInfoView } from "./view";

interface ArtInfoContainerProps {
  artikul: string | undefined;
}

export function ArtInfoContainer({ artikul }: ArtInfoContainerProps) {
  const { data: artData, isPending, error } = useOneArtQuery(artikul);

  if (isPending) return <ArtInfoSkeleton />;
  if (error) return <p>Error: {error.message}</p>;

  return <ArtInfoView artData={artData} />;
}
