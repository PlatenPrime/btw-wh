import type { EnrichedAnalogDto } from "@/modules/analogs/api/types";
import { AnalogDetailsCardView } from "./AnalogDetailsCardView";

interface AnalogDetailsCardProps {
  analog: EnrichedAnalogDto;
}

export function AnalogDetailsCard({ analog }: AnalogDetailsCardProps) {
  return <AnalogDetailsCardView analog={analog} />;
}
