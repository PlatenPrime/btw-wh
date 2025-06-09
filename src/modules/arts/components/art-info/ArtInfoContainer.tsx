import { Skeleton } from "@/components/ui/skeleton";
import { useArtQuery } from "../../hooks/useArtQuery";
import { ArtInfo } from "./ArtInfo";

interface ArtInfoContainerProps {
  artikul: string | undefined;
}

export function ArtInfoContainer({ artikul }: ArtInfoContainerProps) {
  const { data: artInfo, isPending, error } = useArtQuery(artikul);

    if (isPending) return <Skeleton className="h-16 w-full" />;
    if (error) return <p>Error: {error.message}</p>;

  return <ArtInfo artInfo={artInfo} />;
}
