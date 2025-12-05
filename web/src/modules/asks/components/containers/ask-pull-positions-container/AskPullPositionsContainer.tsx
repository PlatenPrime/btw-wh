import type { AskStatus } from "@/modules/asks/api/types/dto";
import { AskPullPositionsFetcher } from "@/modules/asks/components/fetchers/ask-pull-positions-fetcher/AskPullPositionsFetcher";
import { AskPullPositionsContainerSkeleton } from "./AskPullPositionsContainerSkeleton";
import { AskPullPositionsContainerView } from "./AskPullPositionsContainerView";

interface AskPullPositionsContainerProps {
  askId: string;
  askStatus: AskStatus;
}

export function AskPullPositionsContainer({
  askId,
  askStatus,
}: AskPullPositionsContainerProps) {
  return (
    <AskPullPositionsFetcher
      askId={askId}
      ContainerComponent={(props) => (
        <AskPullPositionsContainerView {...props} askId={askId} askStatus={askStatus} />
      )}
      SkeletonComponent={AskPullPositionsContainerSkeleton}
    />
  );
}

