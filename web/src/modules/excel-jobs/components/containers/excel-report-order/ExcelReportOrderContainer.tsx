import type { SkladCode } from "@/constants/sklad";
import type { ReportEntityOption } from "@/modules/excel-jobs/components/controls/report-entity-search";
import { DEFAULT_SKU_SALES_EXCEL_METRICS } from "@/modules/excel-jobs/constants/sku-sales-excel-metrics";
import { DEFAULT_SKU_STOCK_EXCEL_METRICS } from "@/modules/excel-jobs/constants/sku-stock-excel-metrics";
import {
  acknowledgeJourneyStep,
  answerJourneyChoice,
  clearJourneyTail,
  findActiveJourneyIndex,
  journeyAction,
  journeyNeedsKonks,
  journeyNeedsProds,
  resolveExcelJourney,
  resolveJourneyLeaf,
  type ExcelJourneyInput,
  type ExcelJourneyStep,
} from "@/modules/excel-jobs/constants/excel-report-journey";
import { useExcelReportOrderSearch } from "@/modules/excel-jobs/hooks/useExcelReportOrderSearch";
import type { SkuSalesExcelMetric } from "@/modules/excel-jobs/types/sku-sales-excel-metrics";
import type { SkuStockExcelMetric } from "@/modules/excel-jobs/types/sku-stock-excel-metrics";
import { useStartExcelJob } from "@/modules/excel-jobs/providers";
import {
  buildExcelJobRequest,
  type ExcelReportOrderDraft,
  type ExcelSalesSort,
} from "@/modules/excel-jobs/utils/build-excel-job-request";
import type { ExcelReportOrderSearchState } from "@/modules/excel-jobs/utils/excel-report-order-search";
import { useKonksQuery } from "@/modules/konks/api/hooks/queries/useKonksQuery";
import { useProdsQuery } from "@/modules/prods/api/hooks/queries/useProdsQuery";
import { SKU_KONK_PROD_QUERY_ALL } from "@/modules/sku-analytics/constants";
import type { SkugrToggleItem } from "@/modules/skugrs/components/controls/skugr-multi-select-control";
import { format, isValid, parse } from "date-fns";
import { useCallback, useMemo, useState } from "react";
import type { DateRange } from "react-day-picker";
import { ExcelReportOrderContainerSkeleton } from "./ExcelReportOrderContainerSkeleton";
import { ExcelReportOrderContainerView } from "./ExcelReportOrderContainerView";

function formatIso(date: Date | undefined): string {
  return date ? format(date, "yyyy-MM-dd") : "";
}

function toDate(value: string): Date | undefined {
  if (!value) return undefined;
  const parsed = parse(value, "yyyy-MM-dd", new Date());
  return isValid(parsed) ? parsed : undefined;
}

function clearOrderFilters(
  state: ExcelReportOrderSearchState,
  ids: readonly string[],
): ExcelReportOrderSearchState {
  let next = state;
  if (
    ids.some((id) =>
      ["world", "konk", "scope", "measure", "prod", "skugr-ids"].includes(id),
    )
  ) {
    next = { ...next, skugrPicks: [] };
  }
  if (
    ids.some((id) =>
      [
        "world",
        "btrade-report",
        "konk",
        "scope",
        "measure",
        "stock-metrics",
        "sales-metrics",
      ].includes(id),
    )
  ) {
    next = {
      ...next,
      stockMetrics: [...DEFAULT_SKU_STOCK_EXCEL_METRICS],
      salesMetrics: [...DEFAULT_SKU_SALES_EXCEL_METRICS],
    };
  }
  if (
    ids.some((id) =>
      ["world", "konk", "scope", "measure", "sales-sort"].includes(id),
    )
  ) {
    next = { ...next, salesSort: "default" };
  }
  if (
    ids.some((id) => ["world", "konk", "scope", "measure", "abc"].includes(id))
  ) {
    next = { ...next, abc: "", sortByAbc: false };
  }
  if (ids.some((id) => ["world", "wh-report", "sklad"].includes(id))) {
    next = { ...next, sklad: null };
  }
  return next;
}

export function ExcelReportOrderContainer() {
  const { state, setState } = useExcelReportOrderSearch();
  const [editingStepId, setEditingStepId] = useState<string | null>(null);
  const {
    journey,
    stockMetrics,
    salesMetrics,
    salesSort,
    skugrPicks,
    abc,
    sortByAbc,
    sklad,
  } = state;
  const skugrIds = useMemo(
    () => skugrPicks.map((pick) => pick.id),
    [skugrPicks],
  );
  const dateRange = useMemo<DateRange | undefined>(() => {
    const from = toDate(state.dateFrom);
    const to = toDate(state.dateTo);
    if (!from && !to) return undefined;
    return { from, to };
  }, [state.dateFrom, state.dateTo]);
  const since = useMemo(() => toDate(state.since), [state.since]);

  const needsKonks = journeyNeedsKonks(journey);
  const needsProds = journeyNeedsProds(journey);
  const konksQuery = useKonksQuery({ enabled: needsKonks });
  const prodsQuery = useProdsQuery({ enabled: needsProds });
  const { startJob, isStarting } = useStartExcelJob();

  const steps = useMemo(() => resolveExcelJourney(journey), [journey]);
  const activeIndex = findActiveJourneyIndex(steps, editingStepId);
  const action = journeyAction(steps, activeIndex);

  const draft = useMemo<ExcelReportOrderDraft>(() => {
    const leaf = resolveJourneyLeaf(journey);
    return {
      objectId: leaf?.objectId ?? "",
      fileId: leaf?.fileId ?? "",
      konk: journey.konk,
      prod: journey.prod,
      skuId: journey.skuId,
      skuTitle: journey.skuTitle,
      skugrId: journey.skugrId,
      skugrTitle: journey.skugrTitle,
      analogId: journey.analogId,
      analogTitle: journey.analogTitle,
      artikul: journey.artikul,
      artTitle: journey.artTitle,
      dateFrom: state.dateFrom,
      dateTo: state.dateTo,
      since: state.since,
      stockMetrics,
      salesMetrics,
      salesSort,
      skugrIds,
      abc,
      sortByAbc,
      sklad,
    };
  }, [
    abc,
    journey,
    salesMetrics,
    salesSort,
    skugrIds,
    sklad,
    sortByAbc,
    state.dateFrom,
    state.dateTo,
    state.since,
    stockMetrics,
  ]);

  const handleChoice = useCallback(
    (stepId: string, value: string) => {
      setState((prev) => {
        const answered = answerJourneyChoice(prev.journey, stepId, value);
        return clearOrderFilters(
          { ...prev, journey: answered.input },
          answered.clearedStepIds,
        );
      });
      setEditingStepId(null);
    },
    [setState],
  );

  const handleKonk = useCallback(
    (value: string) => {
      setState((prev) => {
        const cleared = clearJourneyTail(prev.journey, "konk", false);
        return clearOrderFilters(
          { ...prev, journey: { ...cleared.input, konk: value } },
          cleared.clearedStepIds,
        );
      });
      setEditingStepId(null);
    },
    [setState],
  );

  const handleProd = useCallback(
    (value: string) => {
      setState((prev) => {
        const cleared = clearJourneyTail(prev.journey, "prod", false);
        return clearOrderFilters(
          { ...prev, journey: { ...cleared.input, prod: value } },
          prev.journey.prod !== value
            ? [...cleared.clearedStepIds, "skugr-ids"]
            : cleared.clearedStepIds,
        );
      });
      setEditingStepId(null);
    },
    [setState],
  );

  const handleEntity = useCallback(
    (option: ReportEntityOption) => {
      setState((prev) => {
        const cleared = clearJourneyTail(prev.journey, "entity", false);
        const next: ExcelJourneyInput = { ...cleared.input };
        if (prev.journey.world === "btrade") {
          next.artikul = option.id;
          next.artTitle = option.title;
          next.artImageUrl = option.imageUrl ?? "";
        } else if (prev.journey.scope === "sku") {
          next.skuId = option.id;
          next.skuTitle = option.title;
          next.skuImageUrl = option.imageUrl ?? "";
        } else if (prev.journey.scope === "skugr") {
          next.skugrId = option.id;
          next.skugrTitle = option.title;
          next.skugrImageUrl = option.imageUrl ?? "";
        }
        return clearOrderFilters(
          { ...prev, journey: next },
          cleared.clearedStepIds,
        );
      });
      setEditingStepId(null);
    },
    [setState],
  );

  const handleSkugrToggle = useCallback(
    (item: SkugrToggleItem) => {
      setState((prev) => ({
        ...prev,
        skugrPicks: item.selected
          ? prev.skugrPicks.some((pick) => pick.id === item.id)
            ? prev.skugrPicks
            : [
                ...prev.skugrPicks,
                { id: item.id, title: item.title, imageUrl: item.imageUrl },
              ]
          : prev.skugrPicks.filter((pick) => pick.id !== item.id),
      }));
    },
    [setState],
  );

  const handleEditStep = useCallback(
    (stepId: string) => {
      setState((prev) => {
        const cleared = clearJourneyTail(prev.journey, stepId, false);
        return clearOrderFilters(
          { ...prev, journey: cleared.input },
          cleared.clearedStepIds,
        );
      });
      setEditingStepId(stepId);
    },
    [setState],
  );

  const handleAcknowledge = useCallback(
    (stepId: string) => {
      setState((prev) => ({
        ...prev,
        journey: acknowledgeJourneyStep(prev.journey, stepId),
      }));
      setEditingStepId(null);
    },
    [setState],
  );

  const handleDateRange = useCallback(
    (range: DateRange | undefined) => {
      setState((prev) => ({
        ...prev,
        dateFrom: formatIso(range?.from),
        dateTo: formatIso(range?.to),
      }));
    },
    [setState],
  );

  const handleSince = useCallback(
    (date: Date | undefined) => {
      setState((prev) => ({ ...prev, since: formatIso(date) }));
    },
    [setState],
  );

  const handleStockMetrics = useCallback(
    (metrics: SkuStockExcelMetric[]) => {
      setState((prev) => ({ ...prev, stockMetrics: metrics }));
    },
    [setState],
  );

  const handleSalesMetrics = useCallback(
    (metrics: SkuSalesExcelMetric[]) => {
      setState((prev) => ({ ...prev, salesMetrics: metrics }));
    },
    [setState],
  );

  const handleSalesSort = useCallback(
    (value: ExcelSalesSort) => {
      setState((prev) => ({ ...prev, salesSort: value }));
    },
    [setState],
  );

  const handleAbc = useCallback(
    (value: string) => {
      setState((prev) => ({ ...prev, abc: value }));
    },
    [setState],
  );

  const handleSortByAbc = useCallback(
    (value: boolean) => {
      setState((prev) => ({ ...prev, sortByAbc: value }));
    },
    [setState],
  );

  const handleSklad = useCallback(
    (value: SkladCode | null) => {
      setState((prev) => ({ ...prev, sklad: value }));
    },
    [setState],
  );

  const handleSubmit = useCallback(async () => {
    const request = buildExcelJobRequest(draft);
    if (!request) return;
    try {
      await startJob(request);
    } catch {
      // toast in provider
    }
  }, [draft, startJob]);

  const activeStep: ExcelJourneyStep | undefined = steps[activeIndex];
  const showSkeleton =
    (activeStep?.type === "konk" &&
      konksQuery.isPending &&
      !konksQuery.data) ||
    (activeStep?.type === "prod" && prodsQuery.isPending && !prodsQuery.data);

  if (showSkeleton) {
    return <ExcelReportOrderContainerSkeleton />;
  }

  const canAdvance =
    activeStep?.type === "period"
      ? activeStep.mode === "since"
        ? Boolean(since)
        : Boolean(
            dateRange?.from &&
              dateRange.to &&
              dateRange.from <= dateRange.to,
          )
      : activeStep?.type === "stock-metrics"
        ? stockMetrics.length > 0
        : activeStep?.type === "sales-metrics"
          ? salesMetrics.length > 0
          : true;

  const prods = (prodsQuery.data?.data ?? []).filter(
    (item) => item.name !== SKU_KONK_PROD_QUERY_ALL,
  );

  return (
    <ExcelReportOrderContainerView
      steps={steps}
      activeIndex={activeIndex}
      konks={konksQuery.data?.data ?? []}
      prods={prods}
      dateRange={dateRange}
      onDateRangeChange={handleDateRange}
      since={since}
      onSinceChange={handleSince}
      stockMetrics={stockMetrics}
      onStockMetricsChange={handleStockMetrics}
      salesMetrics={salesMetrics}
      onSalesMetricsChange={handleSalesMetrics}
      salesSort={salesSort}
      onSalesSortChange={handleSalesSort}
      skugrIds={skugrIds}
      skugrPicks={skugrPicks}
      onSkugrToggle={handleSkugrToggle}
      abc={abc}
      onAbcChange={handleAbc}
      sortByAbc={sortByAbc}
      onSortByAbcChange={handleSortByAbc}
      sklad={sklad}
      onSkladChange={handleSklad}
      konkName={journey.konk}
      prodName={journey.prod}
      action={action}
      canAdvance={canAdvance}
      canSubmit={action === "submit" && buildExcelJobRequest(draft) !== null}
      isStarting={isStarting}
      onEditStep={handleEditStep}
      onChoice={handleChoice}
      onKonk={handleKonk}
      onProd={handleProd}
      onEntity={handleEntity}
      onAcknowledge={handleAcknowledge}
      onSubmit={() => {
        void handleSubmit();
      }}
    />
  );
}
