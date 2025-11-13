import { EntityNotFound } from "@/components/shared/entity-not-found";
import { BtradeArtDataContainerView } from "@/modules/arts/components/containers/btrade-art-data-container/BtradeArtDataContainerView.tsx";
import type { BtradeArtDataContainerProps } from "@/modules/arts/components/fetchers/btrade-art-data-fetcher/BtradeArtDataFetcher";

export function BtradeArtDataContainer({
  artikul,
  data,
  exists,
  message,
  onRetry,
}: BtradeArtDataContainerProps) {
  if (!exists) {
    return (
      <EntityNotFound
        title="Дані про товар не знайдені"
        description={message || `Товар з артикулом ${artikul} відсутній на sharik.ua`}
        onRetry={onRetry}
        className="border border-dashed border-border bg-transparent px-3 py-2 shadow-none [&_[data-slot=card-content]]:px-0 [&_[data-slot=card-content]]:pb-2 [&_[data-slot=card-header]]:px-0 [&_[data-slot=card-header]]:py-0"
      />
    );
  }

  if (!data) {
    return <p className="text-muted-foreground text-xs">Дані тимчасово недоступні</p>;
  }

  return <BtradeArtDataContainerView data={data} />;
}
// Renders Btrade art info block with graceful fallbacks for empty/absent data states.
