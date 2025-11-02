import type { IPull } from "@/modules/pulls/api/types/dto";
import { PullCard } from "@/modules/pulls/components/cards/pull-card/PullCard";

interface PullsListViewProps {
  pulls: IPull[];
}

export function PullsListView({ pulls }: PullsListViewProps) {
  return (
    <div className="grid gap-2">
      {pulls.map((pull) => (
        <PullCard key={pull.palletId} pull={pull} />
      ))}
    </div>
  );
}

