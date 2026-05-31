import type { DelsListResponse } from "@/modules/dels/api/types";
import { DelsContainerView } from "@/modules/dels/components/containers/dels-container/DelsContainerView";

interface DelsContainerProps {
  data: DelsListResponse;
}

export function DelsContainer({ data }: DelsContainerProps) {
  return <DelsContainerView data={data} />;
}
