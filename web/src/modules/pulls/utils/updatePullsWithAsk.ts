import type { AskDto } from "@/modules/asks/api/types/dto";
import type {
  Pull,
  PullPosition,
  PullsResponsePayload,
} from "@/modules/pulls/api/types";

interface UpdatePullsWithAskParams {
  state: PullsResponsePayload | undefined;
  ask: AskDto;
}

const getAskPulledBoxes = (ask: AskDto): number =>
  ask.pullBoxes ?? ask.pullBox ?? 0;

const shouldKeepPosition = ({
  ask,
  position,
}: {
  ask: AskDto;
  position: PullPosition;
}): boolean => {
  if (ask.status !== "new") {
    return false;
  }

  const requestedQuant = position.totalRequestedQuant;
  const pulledQuant = ask.pullQuant ?? 0;
  const pulledBoxes = getAskPulledBoxes(ask);

  if (requestedQuant == null) {
    return pulledQuant === 0 && pulledBoxes === 0;
  }

  return pulledQuant < requestedQuant;
};

const dedupeAskIds = (pulls: Pull[]): number => {
  const uniqueAskIds = new Set<string>();

  pulls.forEach((pull) => {
    pull.positions.forEach((position) => {
      uniqueAskIds.add(position.askId);
    });
  });

  return uniqueAskIds.size;
};

export const updatePullsWithAsk = ({
  state,
  ask,
}: UpdatePullsWithAskParams): PullsResponsePayload | undefined => {
  if (!state) {
    return state;
  }

  let hasChanges = false;

  const nextPulls = state.pulls.reduce<Pull[]>((acc, pull) => {
    let pullChanged = false;

    const nextPositions = pull.positions.reduce<PullPosition[]>(
      (positionsAcc, position) => {
        if (position.askId !== ask._id) {
          positionsAcc.push(position);
          return positionsAcc;
        }

        const nextPosition: PullPosition = {
          ...position,
          alreadyPulledQuant: ask.pullQuant ?? 0,
          alreadyPulledBoxes: getAskPulledBoxes(ask),
        };

        const keepPosition = shouldKeepPosition({ ask, position });

        pullChanged = true;
        hasChanges = true;

        if (keepPosition) {
          positionsAcc.push(nextPosition);
        }

        return positionsAcc;
      },
      [],
    );

    if (nextPositions.length === 0) {
      if (pullChanged) {
        hasChanges = true;
      }
      return acc;
    }

    if (!pullChanged) {
      acc.push(pull);
      return acc;
    }

    const totalAsks = new Set(nextPositions.map((position) => position.askId))
      .size;

    acc.push({
      ...pull,
      positions: nextPositions,
      totalAsks,
    });

    return acc;
  }, state.pulls);

  if (!hasChanges) {
    return state;
  }

  const nextTotalAsks = dedupeAskIds(nextPulls);

  return {
    pulls: nextPulls,
    totalPulls: nextPulls.length,
    totalAsks: nextTotalAsks,
  };
};


