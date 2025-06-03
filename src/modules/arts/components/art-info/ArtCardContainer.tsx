import { Skeleton } from "@/components/ui/skeleton";
import { useArtQuery } from "@/modules/arts/hooks/useArtQuery";
import { ArtCard } from "./ArtCard";

export function ArtCardContainer() {
  const { data: artikul, isPending, isError, error } = useArtQuery();

  if (isPending) return <Skeleton className="h-96 w-full" />;
  if (isError) return <p>{error.message}</p>;

  return <ArtCard artikul={artikul} />;
}
