import type { PullPosition } from "@/modules/pulls/api/types";
import { PullPositionCard } from "@/modules/pulls/components/cards/pull-position-card/PullPositionCard";

const isPositionCompleted = (position: PullPosition) => {
  const requested = position.totalRequestedQuant;
  if (requested == null) {
    return (
      (position.alreadyPulledQuant ?? 0) > 0 ||
      (position.alreadyPulledBoxes ?? 0) > 0
    );
  }

  return (position.alreadyPulledQuant ?? 0) >= requested;
};

interface PullPositionsListViewProps {
  positions: PullPosition[];
  onPositionClick: (position: PullPosition) => void;
}

export function PullPositionsListView({
  positions,
  onPositionClick,
}: PullPositionsListViewProps) {
  return (
    <div className="grid gap-3">
      {positions.map((position) => (
        <PullPositionCard
          key={position.posId}
          position={position}
          onClick={() => onPositionClick(position)}
          isCompleted={isPositionCompleted(position)}
        />
      ))}
    </div>
  );
}

