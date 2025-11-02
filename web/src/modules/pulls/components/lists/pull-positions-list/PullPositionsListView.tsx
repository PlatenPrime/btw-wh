import type { IPullPosition } from "@/modules/pulls/api/types/dto";
import { PullPositionCard } from "@/modules/pulls/components/cards/pull-position-card/PullPositionCard";

interface PullPositionsListViewProps {
  positions: IPullPosition[];
  onPositionClick: (position: IPullPosition) => void;
}

export function PullPositionsListView({
  positions,
  onPositionClick,
}: PullPositionsListViewProps) {
  return (
    <div className="grid gap-2">
      {positions.map((position) => (
        <PullPositionCard
          key={position.posId}
          position={position}
          onClick={() => onPositionClick(position)}
          isCompleted={position.currentQuant === 0}
        />
      ))}
    </div>
  );
}

