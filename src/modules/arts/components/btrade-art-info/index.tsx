import { Status } from "@/components/status";
import { Skeleton } from "@/components/ui/skeleton";
import { BtradeArtInfo } from "./view";
import { useBtradeArtInfoQuery } from "@/modules/arts/hooks/useBtradeArtInfoQuery";

interface BtradeArtInfoContainerProps {
  artikul: string | undefined;
  zone?: string; // zone is not used in this component but can be passed for future use
  // The artikul parameter is used to fetch specific art information.
}

export function BtradeArtInfoContainer({
  artikul,
  zone, // zone is not used in this component but can be passed for future use
}: BtradeArtInfoContainerProps) {
  const {
    data: btradeArtInfo,
    isPending,
    error,
    isError,
  } = useBtradeArtInfoQuery(artikul ?? "");

  if (isPending) return <Skeleton className="h-8 w-full" />;

  if (error)
    return <Status isError={isError} message="Дані з sharik.ua відсутні" />;
  if (!btradeArtInfo) return <p>No information available</p>;

  return (
    <div>
      <BtradeArtInfo zone={zone} info={btradeArtInfo} />
    </div>
  );
}
// This component fetches and displays Btrade art information based on the artikul parameter from the URL.
// It uses the useBtradeArtInfoQuery hook to fetch the data and handles loading and error states.
