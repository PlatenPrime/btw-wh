import type { IAnalogSliceDataItem } from "@/modules/analog-slices/api/types";
import { AnalogSliceTableContainerView } from "./AnalogSliceTableContainerView";

export interface AnalogSliceTableContainerProps {
  data: Record<string, IAnalogSliceDataItem>;
}

export function AnalogSliceTableContainer({ data }: AnalogSliceTableContainerProps) {
  return <AnalogSliceTableContainerView data={data} />;
}
