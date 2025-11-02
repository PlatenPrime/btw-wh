import type { IPull } from "@/modules/pulls/api/types/dto";
import { PullsListView } from "./PullsListView";
import { PullsListEmpty } from "./PullsListEmpty";

interface PullsListProps {
  pulls: IPull[];
}

export function PullsList({ pulls }: PullsListProps) {
  if (pulls.length === 0) {
    return <PullsListEmpty />;
  }

  return <PullsListView pulls={pulls} />;
}

