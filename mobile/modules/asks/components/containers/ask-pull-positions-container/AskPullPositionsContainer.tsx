import { AskPullPositionsFetcher } from "@/modules/asks/components/fetchers/ask-pull-positions-fetcher/AskPullPositionsFetcher";
import { AskPullPositionsContainerSkeleton } from "./AskPullPositionsContainerSkeleton";
import { AskPullPositionsContainerView } from "./AskPullPositionsContainerView";

interface AskPullPositionsContainerProps {
  askId: string;
}

export function AskPullPositionsContainer({
  askId,
}: AskPullPositionsContainerProps) {
  return (
    <AskPullPositionsFetcher
      askId={askId}
      ContainerComponent={(props) => (
        <AskPullPositionsContainerView {...props} askId={askId} />
      )}
      SkeletonComponent={AskPullPositionsContainerSkeleton}
    />
  );
}

