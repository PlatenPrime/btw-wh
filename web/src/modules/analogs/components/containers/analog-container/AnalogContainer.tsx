import type { EnrichedAnalogDto } from "@/modules/analogs/api/types";
import { AnalogDetailHeaderActions } from "@/modules/analogs/components/actions/analog-detail-header-actions";
import { AnalogContainerView } from "@/modules/analogs/components/containers/analog-container/AnalogContainerView";

interface AnalogContainerProps {
  analog: EnrichedAnalogDto;
}

export function AnalogContainer({ analog }: AnalogContainerProps) {
  return (
    <>
      <AnalogDetailHeaderActions analog={analog} />
      <AnalogContainerView analog={analog} />
    </>
  );
}
