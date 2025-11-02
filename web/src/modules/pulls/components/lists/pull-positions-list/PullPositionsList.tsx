import type { IPullPosition } from "@/modules/pulls/api/types/dto";
import { PullPositionsListView } from "./PullPositionsListView";

interface PullPositionsListProps {
  positions: IPullPosition[];
  onPositionClick: (position: IPullPosition) => void;
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

