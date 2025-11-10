import type { AskDto } from "@/modules/asks/api/types/dto";
import type {
  Pull,
  PullPosition,
  PullsResponsePayload,
} from "@/modules/pulls/api/types";

interface OverridePulledProgress {
  deltaQuant?: number;
  deltaBoxes?: number;
}

interface UpdatePullsWithAskParams {
  state: PullsResponsePayload | undefined;
  ask: AskDto;
  overridePulled?: OverridePulledProgress;
}

const getAskPulledBoxes = (
  ask: AskDto,
): { value: number; defined: boolean } => {
  if ("pullBoxes" in ask && typeof ask.pullBoxes === "number") {
    return { value: ask.pullBoxes, defined: true };
  }

  if ("pullBox" in ask && typeof ask.pullBox === "number") {
    return { value: ask.pullBox, defined: true };
  }

  return { value: 0, defined: false };
};

const shouldKeepPosition = ({
  position,
  askStatus,
  nextPulledQuant,
  nextPulledBoxes,
}: {
  position: PullPosition;
  askStatus: AskDto["status"];
  nextPulledQuant: number;
  nextPulledBoxes: number;
}): boolean => {
  if (askStatus !== "new") {
    return false;
  }

  const requestedQuant = position.totalRequestedQuant;

  if (requestedQuant == null) {
    return nextPulledQuant === 0 && nextPulledBoxes === 0;
  }

  return nextPulledQuant < requestedQuant;
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
  overridePulled,
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

        const { value: askPulledBoxes, defined: hasAskPulledBoxes } =
          getAskPulledBoxes(ask);

        const hasAskPulledQuant = typeof ask.pullQuant === "number";
        const nextAlreadyPulledQuant = hasAskPulledQuant
          ? ask.pullQuant ?? 0
          : position.alreadyPulledQuant + (overridePulled?.deltaQuant ?? 0);
        const nextAlreadyPulledBoxes = hasAskPulledBoxes
          ? askPulledBoxes
          : position.alreadyPulledBoxes + (overridePulled?.deltaBoxes ?? 0);

        const nextPosition: PullPosition = {
          ...position,
          alreadyPulledQuant: nextAlreadyPulledQuant,
          alreadyPulledBoxes: nextAlreadyPulledBoxes,
        };

        const keepPosition = shouldKeepPosition({
          position,
          askStatus: ask.status,
          nextPulledQuant: nextAlreadyPulledQuant,
          nextPulledBoxes: nextAlreadyPulledBoxes,
        });

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


