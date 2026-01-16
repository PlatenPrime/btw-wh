import { useCallback } from "react";
import { PosesByArtikulFetcher } from "@/modules/poses/components/fetchers/poses-by-artikul-fetcher";
import type { GetPosesByArtikulResponse } from "@/modules/poses/api/types";
import { PosesByArtikulContainerSkeleton } from "./PosesByArtikulContainerSkeleton";
import { PosesByArtikulContainerView } from "./PosesByArtikulContainerView";
import type { PosesByArtikulContainerProps } from "./types";

export function PosesByArtikulContainer({
  artikul,
  renderPos,
  additionalProps,
}: PosesByArtikulContainerProps) {
  const ContainerComponent = useCallback(
    (props: { data: GetPosesByArtikulResponse }) => (
      <PosesByArtikulContainerView
        {...props}
        renderPos={renderPos}
        additionalProps={additionalProps}
      />
    ),
    [renderPos, additionalProps],
  );

  return (
    <PosesByArtikulFetcher
      artikul={artikul}
      ContainerComponent={ContainerComponent}
      SkeletonComponent={PosesByArtikulContainerSkeleton}
    />
  );
}
