import type { PosListResponse } from "@/modules/poses/api/types";
import { AllPosesContainerView } from "@/modules/poses/components/containers/all-poses-container/AllPosesContainerView";

interface AllPosesContainerProps {
  data: PosListResponse;
}

export function AllPosesContainer({ data }: AllPosesContainerProps) {
  return <AllPosesContainerView data={data} />;
}
