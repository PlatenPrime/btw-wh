import { describe, expect, it } from "vitest";

import type { AskDto } from "@/modules/asks/api/types/dto";
import type {
  Pull,
  PullPosition,
  PullsResponsePayload,
} from "@/modules/pulls/api/types";
import { updatePullsWithAsk } from "@/modules/pulls/utils/updatePullsWithAsk";

const askerStub = {
  _id: "user-1",
  fullname: "Оператор Складу",
  telegram: "@operator",
  photo: "",
};

const createPosition = (overrides: Partial<PullPosition> = {}): PullPosition => ({
  posId: "pos-1",
  artikul: "ART-001",
  currentQuant: 42,
  currentBoxes: 4,
  plannedQuant: 5,
  totalRequestedQuant: 10,
  alreadyPulledQuant: 0,
  alreadyPulledBoxes: 0,
  askId: "ask-1",
  askerData: askerStub,
  nameukr: "Горіх волоський",
  ...overrides,
});

const createPull = (overrides: Partial<Pull> = {}): Pull => ({
  palletId: "pallet-1",
  palletTitle: "Палета A",
  sector: 1,
  rowTitle: "Ряд 1",
  positions: [createPosition()],
  totalAsks: 1,
  ...overrides,
});

const createState = (overrides: Partial<PullsResponsePayload> = {}): PullsResponsePayload => ({
  pulls: [createPull()],
  totalPulls: 1,
  totalAsks: 1,
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

describe("updatePullsWithAsk", () => {
  it("updates progress for matching position and keeps it when request still active", () => {
    const state = createState();
    const ask: AskDto = {
      ...baseAsk,
      pullQuant: 4,
      pullBox: 0,
    };

    const result = updatePullsWithAsk({ state, ask });

    expect(result).not.toBe(state);
    expect(result?.pulls).toHaveLength(1);
    expect(result?.pulls[0].positions).toHaveLength(1);
    expect(result?.pulls[0].positions[0].alreadyPulledQuant).toBe(4);
    expect(result?.totalAsks).toBe(1);

    // ensure previous state left untouched
    expect(state.pulls[0].positions[0].alreadyPulledQuant).toBe(0);
  });

  it("removes position when ask is completed", () => {
    const state = createState();
    const ask: AskDto = {
      ...baseAsk,
      status: "completed",
      pullQuant: 10,
      pullBoxes: 0,
    };

    const result = updatePullsWithAsk({ state, ask });

    expect(result?.pulls).toHaveLength(0);
    expect(result?.totalAsks).toBe(0);
    expect(result?.totalPulls).toBe(0);
  });

  it("drops manual ask position once any progress is recorded", () => {
    const state = createState({
      pulls: [
        createPull({
          positions: [
            createPosition({
              posId: "pos-manual",
              plannedQuant: null,
              totalRequestedQuant: null,
              askId: "ask-manual",
            }),
          ],
          totalAsks: 1,
        }),
      ],
      totalAsks: 1,
    });

    const ask: AskDto = {
      ...baseAsk,
      _id: "ask-manual",
      pullQuant: 1,
      pullBoxes: 0,
    };

    const result = updatePullsWithAsk({ state, ask });

    expect(result?.pulls).toHaveLength(0);
    expect(result?.totalAsks).toBe(0);
  });
});
