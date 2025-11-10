import type { Pull, PullPosition } from "@/modules/pulls/api/types";
import { PullCard } from "@/modules/pulls/components/cards/pull-card/PullCard";

interface PullsListViewProps {
  pulls: Pull[];
  onPositionClick: (pull: Pull, position: PullPosition) => void;
}

export function PullsListView({
  pulls,
  onPositionClick,
}: PullsListViewProps) {
  return (
    <div className="grid gap-3">
      {pulls.map((pull) => (
        <PullCard key={pull.palletId} pull={pull} onPositionClick={onPositionClick} />
      ))}
    </div>
  );
}

