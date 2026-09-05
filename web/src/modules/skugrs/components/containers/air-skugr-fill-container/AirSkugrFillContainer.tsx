import type { SkugrPageDto } from "@/modules/skugrs/api/types";
import { useAirSkugrSingleFill } from "@/modules/skugrs/hooks/useAirSkugrSingleFill";
import { AirSkugrFillContainerView } from "./AirSkugrFillContainerView";

interface AirSkugrFillContainerProps {
  skugr: SkugrPageDto;
}

export function AirSkugrFillContainer({ skugr }: AirSkugrFillContainerProps) {
  const { state, isRunning, extensionAvailable, run, stop, recheckExtension } =
    useAirSkugrSingleFill({
      skugrId: skugr._id,
      url: skugr.url,
      title: skugr.title,
    });

  return (
    <AirSkugrFillContainerView
      skugrUrl={skugr.url}
      state={state}
      isRunning={isRunning}
      extensionAvailable={extensionAvailable}
      onRun={() => void run()}
      onStop={stop}
      onRecheckExtension={() => void recheckExtension()}
    />
  );
}
