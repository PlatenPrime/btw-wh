import { PosesByArtikulFetcher } from "@/modules/poses/components/fetchers/poses-by-artikul-fetcher/PosesByArtikulFetcher";
import { AskPosesByArtikulContainerSkeleton } from "./AskPosesByArtikulContainerSkeleton.tsx";
import { AskPosesByArtikulContainerView } from "./AskPosesByArtikulContainerView.tsx";

interface AskPosesByArtikulContainerProps {
  artikul: string;
  askId: string;
}

export function AskPosesByArtikulContainer({
  artikul,
  askId,
}: AskPosesByArtikulContainerProps) {
  return (
    <PosesByArtikulFetcher
      artikul={artikul}
      ContainerComponent={(props) => <AskPosesByArtikulContainerView {...props} askId={askId} />}
      SkeletonComponent={AskPosesByArtikulContainerSkeleton}
    />
  );
}
