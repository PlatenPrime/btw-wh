import type { PullPosition } from "@/modules/pulls/api/types";
import { PullPositionsListView } from "./PullPositionsListView";

interface PullPositionsListProps {
  positions: PullPosition[];
  onPositionClick: (position: PullPosition) => void;
}

export function PullPositionsList({
  positions,
  onPositionClick,
}: PullPositionsListProps) {
  return (
    <PullPositionsListView
      positions={positions}
      onPositionClick={onPositionClick}
    />
  );
}

