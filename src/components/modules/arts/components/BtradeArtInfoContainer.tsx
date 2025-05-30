import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router";
import { useBtradeArtInfoQuery } from "../hooks/useBtradeArtInfoQuery";
import { BtradeArtInfo } from "./BtradeArtInfo";

export function BtradeArtInfoContainer() {
  const { artikul } = useParams<{ artikul: string }>();

  const {
    data: btradeArtInfo,
    isPending,
    error,
  } = useBtradeArtInfoQuery(artikul || "");

  if (isPending) return <Skeleton className="h-16 w-full" />;

  if (error) return <p>{error.message}</p>;
  if (!btradeArtInfo) return <p>No information available</p>;

  return (
    <div>
      <BtradeArtInfo info={btradeArtInfo} />
    </div>
  );
}
// This component fetches and displays Btrade art information based on the artikul parameter from the URL.
// It uses the useBtradeArtInfoQuery hook to fetch the data and handles loading and error states.
