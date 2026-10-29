import type {
  ExcelReportFileId,
  ExcelReportObject,
} from "@/modules/excel-jobs/constants/excel-report-catalog";

export type ExcelJourneyEntitySource = "sku" | "skugr" | "art";

export const EXCEL_JOURNEY_WORLDS = [
  "btrade",
  "konk",
  "grabo",
  "warehouse",
] as const;

export type ExcelJourneyWorld = (typeof EXCEL_JOURNEY_WORLDS)[number];

export interface ExcelJourneyOption {
  id: string;
  label: string;
}

export interface ExcelJourneyInput {
  world: ExcelJourneyWorld | "";
  btradeReport: string;
  whReport: string;
  konk: string;
  scope: string;
  measure: string;
  prod: string;
  skuId: string;
  skuTitle: string;
  skuImageUrl: string;
  skugrId: string;
  skugrTitle: string;
  skugrImageUrl: string;
  analogId: string;
  analogTitle: string;
  analogImageUrl: string;
  artikul: string;
  artTitle: string;
  artImageUrl: string;
  acked: readonly string[];
}

type JourneyChoiceStep = {
  type: "choice";
  id: string;
  prompt: string;
  options: readonly ExcelJourneyOption[];
  value: string;
};

type JourneyKonkStep = {
  type: "konk";
  id: "konk";
  prompt: string;
  value: string;
};

type JourneyProdStep = {
  type: "prod";
  id: "prod";
  prompt: string;
  value: string;
};

type JourneyEntityStep = {
  type: "entity";
  id: "entity";
  prompt: string;
  source: ExcelJourneyEntitySource;
  konkName: string;
  selectedId: string;
  selectedTitle: string;
  selectedImageUrl: string;
};

type JourneyAckStep = {
  type:
    | "period"
    | "stock-metrics"
    | "sales-metrics"
    | "sales-sort"
    | "skugr-ids"
    | "abc"
    | "sklad";
  id: string;
  prompt: string;
  mode?: "range" | "since";
  acked: boolean;
};

type JourneyReadyStep = {
  type: "ready";
  id: "ready";
  submitLabel: string;
};

export type ExcelJourneyStep =
  | JourneyChoiceStep
  | JourneyKonkStep
  | JourneyProdStep
  | JourneyEntityStep
  | JourneyAckStep
  | JourneyReadyStep;

const WORLD_OPTIONS: readonly ExcelJourneyOption[] = [
  { id: "btrade", label: "Артикули Btrade" },
  { id: "konk", label: "Товари конкурента" },
  { id: "grabo", label: "Grabo" },
  { id: "warehouse", label: "Склад" },
];

const BTRADE_REPORTS: readonly ExcelJourneyOption[] = [
  { id: "art-stock", label: "Залишки одного артикула" },
  { id: "art-sales", label: "Продажі одного артикула" },
  { id: "arts-export", label: "Експорт артикулів" },
  { id: "arts-export-with-stocks", label: "Артикули з залишками" },
  { id: "arts-export-keys", label: "Ключі артикулів" },
];

const WAREHOUSE_REPORTS: readonly ExcelJourneyOption[] = [
  { id: "zones-export", label: "Експорт зон" },
  { id: "poses-export-stocks", label: "Залишки позицій" },
];

const NAMED_SCOPES: readonly ExcelJourneyOption[] = [
  { id: "catalog", label: "Каталог" },
  { id: "sku", label: "Один товар" },
  { id: "skugr", label: "Товарна група" },
  { id: "konk-sku", label: "Усі товари цього конкурента" },
];

const CATALOG_ONLY_SCOPES: readonly ExcelJourneyOption[] = [
  { id: "catalog", label: "Каталог" },
];

const STOCK_SALES: readonly ExcelJourneyOption[] = [
  { id: "stock", label: "Залишки" },
  { id: "sales", label: "Продажі" },
];

const CATALOG_FILES: readonly ExcelJourneyOption[] = [
  { id: "new-since", label: "Нові з дати" },
  { id: "invalid", label: "Невалідні" },
];

export function createEmptyJourney(): ExcelJourneyInput {
  return {
    world: "",
    btradeReport: "",
    whReport: "",
    konk: "",
    scope: "",
    measure: "",
    prod: "",
    skuId: "",
    skuTitle: "",
    skuImageUrl: "",
    skugrId: "",
    skugrTitle: "",
    skugrImageUrl: "",
    analogId: "",
    analogTitle: "",
    analogImageUrl: "",
    artikul: "",
    artTitle: "",
    artImageUrl: "",
    acked: [],
  };
}

function choice(
  id: string,
  prompt: string,
  options: readonly ExcelJourneyOption[],
  value: string,
): JourneyChoiceStep {
  return { type: "choice", id, prompt, options, value };
}

function ack(
  type: JourneyAckStep["type"],
  id: string,
  prompt: string,
  ackedIds: readonly string[],
  mode?: "range" | "since",
): JourneyAckStep {
  return {
    type,
    id,
    prompt,
    mode,
    acked: ackedIds.includes(id),
  };
}

function ready(submitLabel: string): JourneyReadyStep {
  return { type: "ready", id: "ready", submitLabel };
}

function entityStep(
  input: ExcelJourneyInput,
  source: ExcelJourneyEntitySource,
  prompt: string,
  konkName: string,
): JourneyEntityStep {
  const selected =
    source === "sku"
      ? { id: input.skuId, title: input.skuTitle, imageUrl: input.skuImageUrl }
      : source === "skugr"
        ? {
            id: input.skugrId,
            title: input.skugrTitle,
            imageUrl: input.skugrImageUrl,
          }
        : {
            id: input.artikul,
            title: input.artTitle,
            imageUrl: input.artImageUrl,
          };

  return {
    type: "entity",
    id: "entity",
    prompt,
    source,
    konkName,
    selectedId: selected.id,
    selectedTitle: selected.title,
    selectedImageUrl: selected.imageUrl,
  };
}

function pushMeasure(
  steps: ExcelJourneyStep[],
  input: ExcelJourneyInput,
  prompt: string,
  options: readonly ExcelJourneyOption[],
) {
  steps.push(choice("measure", prompt, options, input.measure));
}

function pushPeriod(
  steps: ExcelJourneyStep[],
  input: ExcelJourneyInput,
  mode: "range" | "since",
) {
  steps.push(
    ack(
      "period",
      "period",
      mode === "since" ? "З якої дати?" : "За який період?",
      input.acked,
      mode,
    ),
  );
}

function pushStockSalesTail(
  steps: ExcelJourneyStep[],
  input: ExcelJourneyInput,
  measure: "stock" | "sales",
  extras?: { skugrIds?: boolean; salesSort?: boolean },
) {
  if (extras?.skugrIds) {
    steps.push(
      ack(
        "skugr-ids",
        "skugr-ids",
        "Обмежити товарними групами?",
        input.acked,
      ),
    );
  }
  pushPeriod(steps, input, "range");
  if (measure === "stock") {
    steps.push(ack("stock-metrics", "stock-metrics", "Які метрики?", input.acked));
    return;
  }
  steps.push(ack("sales-metrics", "sales-metrics", "Які метрики?", input.acked));
  if (extras?.salesSort) {
    steps.push(
      ack("sales-sort", "sales-sort", "Як сортувати товари?", input.acked),
    );
  }
}

export function resolveExcelJourney(
  input: ExcelJourneyInput,
): ExcelJourneyStep[] {
  const steps: ExcelJourneyStep[] = [
    choice("world", "З чим працюємо?", WORLD_OPTIONS, input.world),
  ];
  if (!input.world) return steps;

  if (input.world === "grabo") {
    steps.push(ready("Замовити каталог"));
    return steps;
  }

  if (input.world === "warehouse") {
    steps.push(
      choice("wh-report", "Який звіт?", WAREHOUSE_REPORTS, input.whReport),
    );
    if (!input.whReport) return steps;
    if (input.whReport === "poses-export-stocks") {
      steps.push(ack("sklad", "sklad", "Який склад?", input.acked));
      return steps;
    }
    steps.push(ready("Замовити"));
    return steps;
  }

  if (input.world === "btrade") {
    steps.push(
      choice("btrade-report", "Який звіт?", BTRADE_REPORTS, input.btradeReport),
    );
    if (!input.btradeReport) return steps;
    if (input.btradeReport === "art-stock" || input.btradeReport === "art-sales") {
      steps.push(entityStep(input, "art", "Який артикул?", ""));
      if (!input.artikul) return steps;
      pushPeriod(steps, input, "range");
      return steps;
    }
    steps.push(ready("Замовити"));
    return steps;
  }

  steps.push({
    type: "konk",
    id: "konk",
    prompt: "Який конкурент?",
    value: input.konk,
  });
  if (!input.konk) return steps;

  const scopes = input.konk === "all" ? CATALOG_ONLY_SCOPES : NAMED_SCOPES;
  steps.push(choice("scope", "По яких сутностях?", scopes, input.scope));
  if (!input.scope) return steps;

  if (input.scope === "catalog") {
    pushMeasure(steps, input, "Що в каталозі?", CATALOG_FILES);
    if (!input.measure) return steps;
    if (input.measure === "new-since") {
      pushPeriod(steps, input, "since");
      return steps;
    }
    steps.push(ready("Замовити"));
    return steps;
  }

  if (input.scope === "sku" || input.scope === "skugr") {
    pushMeasure(steps, input, "Що порахувати?", STOCK_SALES);
    if (input.measure !== "stock" && input.measure !== "sales") return steps;
    steps.push(
      entityStep(
        input,
        input.scope === "sku" ? "sku" : "skugr",
        input.scope === "sku" ? "Який товар?" : "Яка група?",
        input.konk,
      ),
    );
    const selectedId = input.scope === "sku" ? input.skuId : input.skugrId;
    if (!selectedId) return steps;
    pushStockSalesTail(steps, input, input.measure);
    return steps;
  }

  if (input.scope === "konk-sku") {
    pushMeasure(steps, input, "Що порахувати?", STOCK_SALES);
    if (input.measure !== "stock" && input.measure !== "sales") return steps;
    steps.push({
      type: "prod",
      id: "prod",
      prompt: "Який виробник?",
      value: input.prod,
    });
    if (!input.prod) return steps;
    pushStockSalesTail(steps, input, input.measure, {
      skugrIds: true,
      salesSort: input.measure === "sales",
    });
  }

  return steps;
}

export function isExcelJourneyStepComplete(step: ExcelJourneyStep): boolean {
  switch (step.type) {
    case "choice":
    case "konk":
    case "prod":
      return step.value.trim().length > 0;
    case "entity":
      return step.selectedId.trim().length > 0;
    case "period":
    case "stock-metrics":
    case "sales-metrics":
    case "sales-sort":
    case "skugr-ids":
    case "abc":
    case "sklad":
      return step.acked;
    case "ready":
      return false;
    default: {
      const unreachable: never = step;
      return unreachable;
    }
  }
}

export function findActiveJourneyIndex(
  steps: readonly ExcelJourneyStep[],
  editingStepId: string | null,
): number {
  if (editingStepId) {
    const editingIndex = steps.findIndex((step) => step.id === editingStepId);
    if (editingIndex >= 0) return editingIndex;
  }
  const incomplete = steps.findIndex((step) => !isExcelJourneyStepComplete(step));
  return incomplete === -1 ? Math.max(steps.length - 1, 0) : incomplete;
}

export function journeyAction(
  steps: readonly ExcelJourneyStep[],
  activeIndex: number,
): "next" | "submit" | "none" {
  const step = steps[activeIndex];
  if (!step) return "none";
  if (step.type === "ready") return "submit";
  if (
    step.type === "choice" ||
    step.type === "konk" ||
    step.type === "prod" ||
    step.type === "entity"
  ) {
    return "none";
  }
  return activeIndex === steps.length - 1 ? "submit" : "next";
}

export function resolveJourneyLeaf(
  input: ExcelJourneyInput,
): { objectId: ExcelReportObject; fileId: ExcelReportFileId } | null {
  if (input.world === "grabo") {
    return { objectId: "directory", fileId: "grabo-skus" };
  }
  if (input.world === "warehouse") {
    if (input.whReport === "zones-export") {
      return { objectId: "directory", fileId: "zones-export" };
    }
    if (input.whReport === "poses-export-stocks") {
      return { objectId: "directory", fileId: "poses-export-stocks" };
    }
    return null;
  }
  if (input.world === "btrade") {
    if (input.btradeReport === "art-stock") {
      return { objectId: "art", fileId: "stock" };
    }
    if (input.btradeReport === "art-sales") {
      return { objectId: "art", fileId: "sales" };
    }
    if (
      input.btradeReport === "arts-export" ||
      input.btradeReport === "arts-export-with-stocks" ||
      input.btradeReport === "arts-export-keys"
    ) {
      return { objectId: "directory", fileId: input.btradeReport };
    }
    return null;
  }
  if (input.world !== "konk" || !input.scope || !input.measure) return null;

  if (input.scope === "catalog") {
    if (input.measure === "new-since" || input.measure === "invalid") {
      return { objectId: "catalog", fileId: input.measure };
    }
    return null;
  }
  if (input.scope === "sku" && (input.measure === "stock" || input.measure === "sales")) {
    return { objectId: "sku", fileId: input.measure };
  }
  if (
    input.scope === "skugr" &&
    (input.measure === "stock" || input.measure === "sales")
  ) {
    return { objectId: "skugr", fileId: input.measure };
  }
  if (
    input.scope === "konk-sku" &&
    (input.measure === "stock" || input.measure === "sales")
  ) {
    return { objectId: "konk-sku", fileId: input.measure };
  }
  return null;
}

function withoutEntity(input: ExcelJourneyInput): ExcelJourneyInput {
  return {
    ...input,
    skuId: "",
    skuTitle: "",
    skuImageUrl: "",
    skugrId: "",
    skugrTitle: "",
    skugrImageUrl: "",
    analogId: "",
    analogTitle: "",
    analogImageUrl: "",
    artikul: "",
    artTitle: "",
    artImageUrl: "",
  };
}

function clearStep(
  input: ExcelJourneyInput,
  step: ExcelJourneyStep,
): ExcelJourneyInput {
  const acked = input.acked.filter((id) => id !== step.id);
  switch (step.id) {
    case "world":
      return withoutEntity({ ...input, world: "", acked });
    case "btrade-report":
      return withoutEntity({ ...input, btradeReport: "", acked });
    case "wh-report":
      return { ...input, whReport: "", acked };
    case "konk":
      return withoutEntity({ ...input, konk: "", acked });
    case "scope":
      return withoutEntity({ ...input, scope: "", acked });
    case "measure":
      return withoutEntity({ ...input, measure: "", acked });
    case "prod":
      return { ...input, prod: "", acked };
    case "entity":
      return withoutEntity({ ...input, acked });
    default:
      return { ...input, acked };
  }
}

export function clearJourneyTail(
  input: ExcelJourneyInput,
  fromStepId: string,
  includeStep: boolean,
): { input: ExcelJourneyInput; clearedStepIds: string[] } {
  const steps = resolveExcelJourney(input);
  const index = steps.findIndex((step) => step.id === fromStepId);
  if (index < 0) return { input, clearedStepIds: [] };

  const tail = steps.slice(includeStep ? index : index + 1);
  let next = input;
  for (const step of tail) {
    next = clearStep(next, step);
  }
  return { input: next, clearedStepIds: tail.map((step) => step.id) };
}

export function writeJourneyChoice(
  input: ExcelJourneyInput,
  stepId: string,
  value: string,
): ExcelJourneyInput {
  switch (stepId) {
    case "world":
      return {
        ...input,
        world: EXCEL_JOURNEY_WORLDS.includes(value as ExcelJourneyWorld)
          ? (value as ExcelJourneyWorld)
          : "",
      };
    case "btrade-report":
      return { ...input, btradeReport: value };
    case "wh-report":
      return { ...input, whReport: value };
    case "scope":
      return { ...input, scope: value };
    case "measure":
      return { ...input, measure: value };
    default:
      return input;
  }
}

export function answerJourneyChoice(
  input: ExcelJourneyInput,
  stepId: string,
  value: string,
): { input: ExcelJourneyInput; clearedStepIds: string[] } {
  const cleared = clearJourneyTail(input, stepId, false);
  return {
    input: writeJourneyChoice(cleared.input, stepId, value),
    clearedStepIds: cleared.clearedStepIds,
  };
}

export function acknowledgeJourneyStep(
  input: ExcelJourneyInput,
  stepId: string,
): ExcelJourneyInput {
  if (input.acked.includes(stepId)) return input;
  return { ...input, acked: [...input.acked, stepId] };
}

export function journeyNeedsKonks(input: ExcelJourneyInput): boolean {
  return input.world === "konk";
}

export function journeyNeedsProds(input: ExcelJourneyInput): boolean {
  return input.scope === "konk-sku";
}
