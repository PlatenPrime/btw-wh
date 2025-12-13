import type { GetAsksPullsResponse } from "@/modules/asks/api/types/dto";
import { PullsContainerView } from "@/modules/asks/components/containers/pulls-container/PullsContainerView";

interface PullsContainerProps {
  data: GetAsksPullsResponse["data"];
  isFetching: boolean;
}

export function PullsContainer({
  data,
  isFetching,
}: PullsContainerProps) {
  return <PullsContainerView data={data} isFetching={isFetching} />;
}

