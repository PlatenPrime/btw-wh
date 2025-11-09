import { FetchIndicator } from "@/components/shared/fetch-indicator";
import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import type { GetPullsResponse } from "@/modules/pulls/api/types/dto";
import { PullStats } from "@/modules/pulls/components/elements/PullStats";
import { PullsList } from "@/modules/pulls/components/lists/pulls-list/PullsList";
import { Package } from "lucide-react";

interface PullsContainerViewProps {
  data: GetPullsResponse;
  isFetching: boolean;
}

export function PullsContainerView({
  data,
  isFetching,
}: PullsContainerViewProps) {
  return (
    <main className="grid gap-2">
      <Wrapper className="flex items-center justify-between gap-2">
        <FetchIndicator
          total={data.data.totalPulls}
          isFetching={isFetching}
          icon={<Package />}
        />
        <PullStats
          totalPulls={data.data.totalPulls}
          totalAsks={data.data.totalAsks}
        />
      </Wrapper>

      <Wrapper className={isFetching ? "opacity-50" : ""}>
        <PullsList pulls={data.data.pulls} />
      </Wrapper>
    </main>
  );
}
