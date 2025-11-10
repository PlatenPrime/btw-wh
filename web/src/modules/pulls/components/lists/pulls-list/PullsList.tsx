import type { Pull, PullPosition } from "@/modules/pulls/api/types";
import { PullsListView } from "./PullsListView";
import { PullsListEmpty } from "./PullsListEmpty";

interface PullsListProps {
  pulls: Pull[];
  onPositionClick: (pull: Pull, position: PullPosition) => void;
  isEmpty: boolean;
}

export function PullsList({
  pulls,
  onPositionClick,
  isEmpty,
}: PullsListProps) {
  if (isEmpty) {
    return <PullsListEmpty />;
  }

  return <PullsListView pulls={pulls} onPositionClick={onPositionClick} />;
}

