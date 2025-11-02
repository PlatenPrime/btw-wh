import type { GetPullsResponse } from "@/modules/pulls/api/types/dto";
import { PullsContainerView } from "./PullsContainerView";

interface PullsContainerProps {
  data: GetPullsResponse;
  isFetching: boolean;
}

export function PullsContainer({ data, isFetching }: PullsContainerProps) {
  return <PullsContainerView data={data} isFetching={isFetching} />;
}

