import { ErrorDisplay } from "@/components/error-components";
import { LoadingNoData } from "@/components/loading-states/loading-nodata";
import { useBtradeArtDataQuery } from "@/modules/arts/api/hooks/queries/useBtradeArtDataQuery";
import { BtradeArtData } from "@/modules/arts/components/elements/btrade-art-data/BtradeArtData";
import { BtradeArtDataSkeleton } from "@/modules/arts/components/elements/btrade-art-data/BtradeArtDataSkeleton";

interface BtradeArtDataFetcherProps {
  artikul: string | undefined;
  zone: string;
}

export function BtradeArtDataFetcher({
  artikul,
  zone,
}: BtradeArtDataFetcherProps) {
  const {
    data: btradeArtData,
    isLoading,
    error,
  } = useBtradeArtDataQuery(artikul ?? "");

  if (isLoading) return <BtradeArtDataSkeleton />;

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження даних з sharik.ua"
        description="Не вдалося завантажити дані з sharik.ua"
      />
    );

  if (!btradeArtData)
    return <LoadingNoData description="Немає даних для відображення" />;

  return <BtradeArtData artikul={artikul} zone={zone} data={btradeArtData} />;
}
