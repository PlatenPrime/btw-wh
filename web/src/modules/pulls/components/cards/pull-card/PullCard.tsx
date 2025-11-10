import type { Pull, PullPosition } from "@/modules/pulls/api/types";
import { PullCardView } from "./PullCardView";

interface PullCardProps {
  pull: Pull;
  onPositionClick: (pull: Pull, position: PullPosition) => void;
}

export function PullCard({ pull, onPositionClick }: PullCardProps) {
  return (
    <PullCardView
      pull={pull}
      onPositionClick={(position) => onPositionClick(pull, position)}
    />
  );
}

