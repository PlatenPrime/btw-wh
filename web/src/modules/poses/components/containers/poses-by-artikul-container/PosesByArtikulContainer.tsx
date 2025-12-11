import { PosesByArtikulFetcher } from "@/modules/poses/components/fetchers/poses-by-artikul-fetcher";
import { PosesByArtikulContainerSkeleton } from "./PosesByArtikulContainerSkeleton";
import { PosesByArtikulContainerView } from "./PosesByArtikulContainerView";
import type { PosesByArtikulContainerProps } from "./types";

export function PosesByArtikulContainer({
  artikul,
  renderPos,
  additionalProps,
}: PosesByArtikulContainerProps) {
  return (
    <PosesByArtikulFetcher
      artikul={artikul}
      ContainerComponent={(props) => (
        <PosesByArtikulContainerView
          {...props}
          renderPos={renderPos}
          additionalProps={additionalProps}
        />
      )}
      SkeletonComponent={PosesByArtikulContainerSkeleton}
    />
  );
}
