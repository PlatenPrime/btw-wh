import type { PullPosition } from "@/modules/pulls/api/types";
import { PullPositionCardView } from "./PullPositionCardView";

interface PullPositionCardProps {
  position: PullPosition;
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

