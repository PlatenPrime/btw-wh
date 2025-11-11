import { describe, expect, it, vi } from "vitest";

import type { AskDto } from "@/modules/asks/api/types/dto";
import type {
  PullPosition,
  PullsResponsePayload,
} from "@/modules/pulls/api/types";
import { hasAskRemainingPositions } from "@/modules/pulls/utils/hasAskRemainingPositions";

const askerStub = {
  _id: "user-1",
  fullname: "Оператор Складу",
  telegram: "@operator",
  photo: "",
};

const createPosition = (
  overrides: Partial<PullPosition> = {},
): PullPosition => ({
  posId: "pos-1",
  artikul: "ART-001",
  currentQuant: 10,
  currentBoxes: 1,
  plannedQuant: 5,
  totalRequestedQuant: 10,
  alreadyPulledQuant: 0,
  alreadyPulledBoxes: 0,
  askId: "ask-1",
  askerData: askerStub,
  nameukr: "Горіх волоський",
  ...overrides,
});

const baseAsk: AskDto = {
  _id: "ask-1",
  artikul: "ART-001",
  asker: "user-1",
  askerData: askerStub,
  status: "new",
  events: [],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const createState = (position: PullPosition): PullsResponsePayload => ({
  pulls: [
    {
      palletId: "pallet-1",
      palletTitle: "Палета A",
      sector: 1,
      rowTitle: "Ряд 1",
      positions: [position],
      totalAsks: 1,
    },
  ],
  totalPulls: 1,
  totalAsks: 1,
});

const createQueryClientStub = (state: PullsResponsePayload) => ({
  getQueryData: vi.fn().mockReturnValue(state) as <T>(
    queryKey: readonly unknown[],
  ) => T | undefined,
});

describe("hasAskRemainingPositions", () => {
  it("returns false when query cache lacks pulls array", () => {
    const ask: AskDto = {
      ...baseAsk,
      pullQuant: 1,
      pullBoxes: 0,
    };
    const queryClient = createQueryClientStub(
      {} as unknown as PullsResponsePayload,
    );

    const result = hasAskRemainingPositions({
      queryClient,
      ask,
      overridePulled: {
        deltaQuant: 0,
        deltaBoxes: 0,
        nextCurrentQuant: 0,
        nextCurrentBoxes: 0,
      },
    });

    expect(result).toBe(false);
  });

  it("returns false when manual ask received progress and should drop from pulls cache", () => {
    const position = createPosition({
      totalRequestedQuant: null,
      plannedQuant: null,
      askId: "ask-manual",
    });
    const ask: AskDto = {
      ...baseAsk,
      _id: "ask-manual",
      pullQuant: undefined,
      pullBox: undefined,
      pullBoxes: undefined,
    };
    const state = createState(position);
    const queryClient = createQueryClientStub(state);

    const result = hasAskRemainingPositions({
      queryClient,
      ask,
      overridePulled: {
        deltaQuant: 2,
        deltaBoxes: 0,
        nextCurrentQuant: 8,
        nextCurrentBoxes: 1,
      },
    });

    expect(result).toBe(false);
  });

  it("returns false when requested quant larger than stock and nothing else to pull", () => {
    const position = createPosition({
      totalRequestedQuant: 100,
      alreadyPulledQuant: 90,
      currentQuant: 5,
      currentBoxes: 0,
    });
    const ask: AskDto = {
      ...baseAsk,
      pullQuant: 95,
      pullBoxes: 0,
    };
    const state = createState(position);
    const queryClient = createQueryClientStub(state);

    const result = hasAskRemainingPositions({
      queryClient,
      ask,
      overridePulled: {
        deltaQuant: 5,
        deltaBoxes: 0,
        nextCurrentQuant: 0,
        nextCurrentBoxes: 0,
      },
    });

    expect(result).toBe(false);
  });
});
