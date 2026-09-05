import { useAirClientSkugrFill } from "@/modules/skugrs/hooks/useAirClientSkugrFill";
import { AirClientSkugrFillContainerView } from "./AirClientSkugrFillContainerView";
import { AirClientSkugrFillSkeleton } from "./AirClientSkugrFillSkeleton";

export function AirClientSkugrFillContainer() {
  const {
    items,
    rowStates,
    summary,
    isRunning,
    extensionAvailable,
    isPendingLoading,
    run,
    stop,
    retryItem,
    refreshQueue,
    recheckExtension,
  } = useAirClientSkugrFill();

  if (isPendingLoading) {
    return <AirClientSkugrFillSkeleton />;
  }

  return (
    <AirClientSkugrFillContainerView
      items={items}
      rowStates={rowStates}
      summary={summary}
      isRunning={isRunning}
      extensionAvailable={extensionAvailable}
      onRun={() => void run()}
      onStop={stop}
      onRetry={(skugrId) => void retryItem(skugrId)}
      onRefresh={refreshQueue}
      onRecheckExtension={() => void recheckExtension()}
    />
  );
}
