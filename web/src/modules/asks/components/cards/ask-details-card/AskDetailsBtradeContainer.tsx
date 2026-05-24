import type { BtradeArtDataContainerProps } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";
import { AskDetailsBtradeSummary } from "@/modules/asks/components/cards/ask-details-card/AskDetailsBtradeSummary";

export function AskDetailsBtradeContainer({
  exists,
  data,
}: BtradeArtDataContainerProps) {
  if (!exists) {
    return (
      <p className="text-muted-foreground col-span-2 text-xs">
        Товар відсутній на sharik.ua
      </p>
    );
  }

  if (!data) {
    return (
      <p className="text-muted-foreground col-span-2 text-xs">
        Дані тимчасово недоступні
      </p>
    );
  }

  return <AskDetailsBtradeSummary data={data} />;
}
