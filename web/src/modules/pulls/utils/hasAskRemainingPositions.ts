import type { AskDto } from "@/modules/asks/api/types/dto";
import type { PullsResponsePayload } from "@/modules/pulls/api/types";

import type { OverridePulledProgress } from "./updatePullsWithAsk";
import { updatePullsWithAsk } from "./updatePullsWithAsk";

interface PullsQueryReader {
  getQueryData: <T>(queryKey: readonly unknown[]) => T | undefined;
}

interface HasAskRemainingPositionsParams {
  queryClient: PullsQueryReader;
  ask: AskDto;
  overridePulled?: OverridePulledProgress;
}

const pullsQueryKey = ["pulls"] as const;

export const hasAskRemainingPositions = ({
  queryClient,
  ask,
  overridePulled,
}: HasAskRemainingPositionsParams): boolean => {
  const state = queryClient.getQueryData<PullsResponsePayload>(
    pullsQueryKey,
  );

  if (!state) {
    return true;
  }

  const nextState =
    updatePullsWithAsk({
      state,
      ask,
      overridePulled,
    }) ?? state;

  const pulls = nextState.pulls;

  if (!pulls || pulls.length === 0) {
    return false;
  }

  return pulls.some((pull) =>
    pull.positions.some((position) => position.askId === ask._id),
  );
};


