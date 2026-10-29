import { describe, expect, it } from "vitest";
import {
  acknowledgeJourneyStep,
  answerJourneyChoice,
  clearJourneyTail,
  createEmptyJourney,
  findActiveJourneyIndex,
  journeyAction,
  resolveExcelJourney,
  resolveJourneyLeaf,
  type ExcelJourneyInput,
} from "@/modules/excel-jobs/constants/excel-report-journey";

function ids(input: ExcelJourneyInput): string[] {
  return resolveExcelJourney(input).map((step) => step.id);
}

describe("resolveExcelJourney", () => {
  it("starts with a single question", () => {
    const steps = resolveExcelJourney(createEmptyJourney());
    expect(ids(createEmptyJourney())).toEqual(["world"]);
    expect(findActiveJourneyIndex(steps, null)).toBe(0);
    expect(journeyAction(steps, 0)).toBe("none");
  });

  it("offers only the Grabo order after that world is chosen", () => {
    const input = answerJourneyChoice(createEmptyJourney(), "world", "grabo").input;
    const steps = resolveExcelJourney(input);
    expect(ids(input)).toEqual(["world", "ready"]);
    expect(resolveJourneyLeaf(input)).toEqual({
      objectId: "directory",
      fileId: "grabo-skus",
    });
    expect(journeyAction(steps, 1)).toBe("submit");
  });

  it("limits all-competitors to the catalog", () => {
    let input = answerJourneyChoice(createEmptyJourney(), "world", "konk").input;
    input = { ...input, konk: "all" };
    const scope = resolveExcelJourney(input).find((step) => step.id === "scope");
    expect(scope?.type).toBe("choice");
    if (scope?.type === "choice") {
      expect(scope.options.map((option) => option.id)).toEqual(["catalog"]);
    }
  });

  it("asks for the product before the period on a competitor SKU", () => {
    let input = answerJourneyChoice(createEmptyJourney(), "world", "konk").input;
    input = { ...input, konk: "rozetka" };
    input = answerJourneyChoice(input, "scope", "sku").input;
    input = answerJourneyChoice(input, "measure", "sales").input;
    expect(ids(input)).toEqual(["world", "konk", "scope", "measure", "entity"]);

    input = { ...input, skuId: "sku-1", skuTitle: "Дриль" };
    expect(ids(input)).toEqual([
      "world",
      "konk",
      "scope",
      "measure",
      "entity",
      "period",
      "sales-metrics",
    ]);
    expect(resolveJourneyLeaf(input)).toEqual({
      objectId: "sku",
      fileId: "sales",
    });
    const steps = resolveExcelJourney(input);
    expect(findActiveJourneyIndex(steps, null)).toBe(
      steps.findIndex((step) => step.id === "period"),
    );
    expect(journeyAction(steps, steps.length - 1)).toBe("submit");
  });

  it("drops the tail when an earlier answer changes", () => {
    let input = answerJourneyChoice(createEmptyJourney(), "world", "konk").input;
    input = { ...input, konk: "rozetka", scope: "sku", measure: "stock", skuId: "sku-1" };
    input = acknowledgeJourneyStep(input, "period");
    const cleared = answerJourneyChoice(input, "scope", "catalog");
    expect(cleared.input.scope).toBe("catalog");
    expect(cleared.input.measure).toBe("");
    expect(cleared.input.skuId).toBe("");
    expect(cleared.input.acked).toEqual([]);
    expect(cleared.clearedStepIds).toContain("measure");
  });

  it("maps a btrade article and a warehouse export", () => {
    let btrade = answerJourneyChoice(createEmptyJourney(), "world", "btrade").input;
    btrade = answerJourneyChoice(btrade, "btrade-report", "art-stock").input;
    expect(resolveJourneyLeaf(btrade)).toEqual({ objectId: "art", fileId: "stock" });

    let zones = answerJourneyChoice(createEmptyJourney(), "world", "warehouse").input;
    zones = answerJourneyChoice(zones, "wh-report", "zones-export").input;
    expect(resolveJourneyLeaf(zones)).toEqual({
      objectId: "directory",
      fileId: "zones-export",
    });
    expect(ids(zones)).toEqual(["world", "wh-report", "ready"]);
  });

  it("clears answers after the edited step and keeps that step", () => {
    let input = answerJourneyChoice(createEmptyJourney(), "world", "btrade").input;
    input = answerJourneyChoice(input, "btrade-report", "arts-export").input;
    const cleared = clearJourneyTail(input, "world", false);
    expect(cleared.input.world).toBe("btrade");
    expect(cleared.input.btradeReport).toBe("");
  });
});
