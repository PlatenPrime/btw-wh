import type { IPullPosition } from "@/modules/pulls/api/types/dto";
import { PullPositionCardView } from "./PullPositionCardView";

interface PullPositionCardProps {
  position: IPullPosition;
  onClick: () => void;
  isCompleted?: boolean;
}

export function PullPositionCard({
  position,
  onClick,
  isCompleted = false,
}: PullPositionCardProps) {
  return (
    <PullPositionCardView
      position={position}
      onClick={onClick}
      isCompleted={isCompleted}
    />
  );
}

