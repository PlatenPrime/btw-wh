import { useAirClientSlices } from "@/modules/sku-analytics/hooks/useAirClientSlices";
import { AirClientSlicesContainerView } from "./AirClientSlicesContainerView";
import { AirClientSlicesSkeleton } from "./AirClientSlicesSkeleton";

export function AirClientSlicesContainer() {
  const {
    items,
    sliceDate,
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
  } = useAirClientSlices();

  if (isPendingLoading) {
    return <AirClientSlicesSkeleton />;
  }

  return (
    <AirClientSlicesContainerView
      items={items}
      rowStates={rowStates}
      summary={summary}
      sliceDate={sliceDate}
      isRunning={isRunning}
      extensionAvailable={extensionAvailable}
      onRun={() => void run()}
      onStop={stop}
      onRetry={(skuId) => void retryItem(skuId)}
      onRefresh={refreshQueue}
      onRecheckExtension={() => void recheckExtension()}
    />
  );
}
