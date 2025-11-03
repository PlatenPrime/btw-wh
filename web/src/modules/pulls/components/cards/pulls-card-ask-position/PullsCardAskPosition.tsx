import type { IPull } from "@/modules/pulls/api/types/dto";
import { PullsCardAskPositionView } from "./PullsCardAskPositionView";

interface PullsCardAskPositionProps {
  pull: IPull;
}

export function PullsCardAskPosition({ pull }: PullsCardAskPositionProps) {
  return <PullsCardAskPositionView pull={pull} />;
}

