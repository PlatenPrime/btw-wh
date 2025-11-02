import { Container } from "@/components/shared/containers/Container";
import { FetchIndicator } from "@/components/shared/fetch-indicator";
import type { GetPullsResponse } from "@/modules/pulls/api/types/dto";
import { PullsList } from "@/modules/pulls/components/lists/pulls-list/PullsList";
import { PullStats } from "@/modules/pulls/components/elements/PullStats";
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
      <Container className="flex items-center justify-between gap-2">
        <FetchIndicator
          total={data.data.totalPulls}
          isFetching={isFetching}
          icon={<Package />}
        />
        <PullStats
          totalPulls={data.data.totalPulls}
          totalAsks={data.data.totalAsks}
        />
      </Container>

      <Container className={isFetching ? "opacity-50" : ""}>
        <PullsList pulls={data.data.pulls} />
      </Container>
    </main>
  );
}

