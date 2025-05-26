import { useArtQuery } from "@/components/modules/arts/hooks/useArtQuery";
import { ArtCard } from "./ArtCard";
import { Skeleton } from "@/components/ui/skeleton";

export function ArtCardContainer() {
  const { data: artikul, isPending, isError } = useArtQuery();

  console.log("ArtCardContainer", { artikul, isPending, isError });
  

  if (isPending) return <Skeleton className="h-96 w-full" />;
  if (isError) return <p>Ошибка загрузки артикула</p>;



  return <ArtCard artikul={artikul} />;
}
