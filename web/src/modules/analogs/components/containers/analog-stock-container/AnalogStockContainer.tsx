import { EntityNotFound } from "@/components/shared/entity-not-found";
import type { AnalogStockContainerProps } from "@/modules/analogs/components/fetchers/analog-stock-fetcher";
import { AnalogStockContainerView } from "./AnalogStockContainerView";

export function AnalogStockContainer({
  data,
  message,
  onRetry,
}: AnalogStockContainerProps) {
  if (!data) {
    return (
      <EntityNotFound
        title="Дані про залишок та ціну недоступні"
        description={
          message || "Не вдалося отримати залишок та ціну товару у конкурента"
        }
        onRetry={onRetry}
        className="border-border border border-dashed bg-transparent px-3 py-2 shadow-none [&_[data-slot=card-content]]:px-0 [&_[data-slot=card-content]]:pb-2 [&_[data-slot=card-header]]:px-0 [&_[data-slot=card-header]]:py-0"
      />
    );
  }

  return <AnalogStockContainerView data={data} />;
}
