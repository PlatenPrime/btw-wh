import { PosesByArtikulFetcher } from "@/modules/poses/components/fetchers/poses-by-artikul-fetcher/PosesByArtikulFetcher";
import { PosesByArtikulContainerSkeleton } from "./PosesByArtikulContainerSkeleton.tsx";
import { PosesByArtikulContainerView } from "./PosesByArtikulContainerView.tsx";

interface PosesByArtikulContainerProps {
  artikul: string;
}

export function PosesByArtikulContainer({
  artikul,
}: PosesByArtikulContainerProps) {
  return (
    <PosesByArtikulFetcher
      artikul={artikul}
      ContainerComponent={PosesByArtikulContainerView}
      SkeletonComponent={PosesByArtikulContainerSkeleton}
    />
  );
}
