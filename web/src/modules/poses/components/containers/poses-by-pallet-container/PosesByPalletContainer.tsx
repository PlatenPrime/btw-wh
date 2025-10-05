import type { IPos } from "@/modules/poses/api/types";
import { PosesByPalletContainerView } from "@/modules/poses/components/containers/poses-by-pallet-container/PosesByPalletContainerView.tsx";
import { sortPosesByType } from "@/modules/poses/utils/sortPosesByType";

interface PosesByPalletContainerProps {
  poses: IPos[];
  newPosIds?: string[];
}

export function PosesByPalletContainer({
  poses,
  newPosIds = [],
}: PosesByPalletContainerProps) {
  const allPoses = sortPosesByType(poses, newPosIds);

  return (
    <PosesByPalletContainerView allPoses={allPoses} newPosIds={newPosIds} />
  );
}
