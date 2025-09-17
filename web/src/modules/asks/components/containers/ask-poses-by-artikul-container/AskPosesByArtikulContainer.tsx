import { PosesByArtikulFetcher } from "@/modules/poses/components/fetchers/poses-by-artikul-fetcher/PosesByArtikulFetcher";
import { AskPosesByArtikulContainerSkeleton } from "./AskPosesByArtikulContainerSkeleton.tsx";
import { AskPosesByArtikulContainerView } from "./AskPosesByArtikulContainerView.tsx";

interface AskPosesByArtikulContainerProps {
  artikul: string;
}

export function AskPosesByArtikulContainer({
  artikul,
}: AskPosesByArtikulContainerProps) {
  return (
    <PosesByArtikulFetcher
      artikul={artikul}
      ContainerComponent={AskPosesByArtikulContainerView}
      SkeletonComponent={AskPosesByArtikulContainerSkeleton}
    />
  );
}
