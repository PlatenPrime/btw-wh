import type { ConstantsListResponse } from "@/modules/constants/api/types";
import { ConstantsContainerView } from "@/modules/constants/components/containers/constants-container/ConstantsContainerView";

interface ConstantsContainerProps {
  data: ConstantsListResponse;
}

export function ConstantsContainer({ data }: ConstantsContainerProps) {
  return <ConstantsContainerView data={data} />;
}
