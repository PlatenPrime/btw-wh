import type { EnrichedAnalogDto } from "@/modules/analogs/api/types";
import { AnalogDetailsCard } from "@/modules/analogs/components/cards/analog-details-card";

interface AnalogContainerViewProps {
  analog: EnrichedAnalogDto;
}

export function AnalogContainerView({ analog }: AnalogContainerViewProps) {
  return (
    <div className="grid gap-2">
      <AnalogDetailsCard analog={analog} />
    </div>
  );
}
