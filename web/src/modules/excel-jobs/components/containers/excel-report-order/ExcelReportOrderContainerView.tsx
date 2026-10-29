import { DetailPanelCard } from "@/components/shared/cards";
import { ProdEntitySelect } from "@/components/shared/controls/prod-entity-select/ProdEntitySelect";
import { EntityLabel } from "@/components/shared/entities/entity-label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { sklads, type SkladCode } from "@/constants/sklad";
import { typography } from "@/lib/typography";
import {
  ReportEntitySearch,
  type ReportEntityOption,
} from "@/modules/excel-jobs/components/controls/report-entity-search";
import { SkuSalesExcelMetricsControl } from "@/modules/excel-jobs/components/controls/sku-sales-excel-metrics-control";
import { SkuStockExcelMetricsControl } from "@/modules/excel-jobs/components/controls/sku-stock-excel-metrics-control";
import type { ExcelJourneyStep } from "@/modules/excel-jobs/constants/excel-report-journey";
import { SKU_SALES_EXCEL_METRIC_LABELS } from "@/modules/excel-jobs/constants/sku-sales-excel-metrics";
import { SKU_STOCK_EXCEL_METRIC_LABELS } from "@/modules/excel-jobs/constants/sku-stock-excel-metrics";
import type { SkuSalesExcelMetric } from "@/modules/excel-jobs/types/sku-sales-excel-metrics";
import type { SkuStockExcelMetric } from "@/modules/excel-jobs/types/sku-stock-excel-metrics";
import type { ExcelSalesSort } from "@/modules/excel-jobs/utils/build-excel-job-request";
import type { KonkDto } from "@/modules/konks/api/types";
import type { ProdDto } from "@/modules/prods/api/types";
import { SKU_KONK_PROD_QUERY_ALL } from "@/modules/sku-analytics/constants";
import {
  SkugrMultiSelectControl,
  type SkugrToggleItem,
} from "@/modules/skugrs/components/controls/skugr-multi-select-control";
import { SKUS_EXCEL_ALL_KONKS_VALUE } from "@/modules/skus/components/dialogs/skus-excel-konk-scope";
import { format } from "date-fns";
import type { ReactNode } from "react";
import type { DateRange } from "react-day-picker";

const ABC_OPTIONS = [
  { value: "all", label: "Усі" },
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "C", label: "C" },
  { value: "D", label: "D" },
] as const;

const ALL_SKLADS_VALUE = "all-sklads";

function ignoreSkugrIdsChange(_ids: string[]): void {
  void _ids;
}

const SALES_SORT_LABELS: Record<ExcelSalesSort, string> = {
  default: "За замовчуванням",
  sales: "За кількістю продажів (шт)",
  revenue: "За виручкою",
};

export interface ExcelReportOrderContainerViewProps {
  steps: readonly ExcelJourneyStep[];
  activeIndex: number;
  konks: KonkDto[];
  prods: ProdDto[];
  dateRange: DateRange | undefined;
  onDateRangeChange: (range: DateRange | undefined) => void;
  since: Date | undefined;
  onSinceChange: (date: Date | undefined) => void;
  stockMetrics: readonly SkuStockExcelMetric[];
  onStockMetricsChange: (metrics: SkuStockExcelMetric[]) => void;
  salesMetrics: readonly SkuSalesExcelMetric[];
  onSalesMetricsChange: (metrics: SkuSalesExcelMetric[]) => void;
  salesSort: ExcelSalesSort;
  onSalesSortChange: (value: ExcelSalesSort) => void;
  skugrIds: string[];
  skugrPicks: readonly {
    id: string;
    title: string;
    imageUrl?: string;
  }[];
  onSkugrToggle: (item: SkugrToggleItem) => void;
  abc: string;
  onAbcChange: (value: string) => void;
  sortByAbc: boolean;
  onSortByAbcChange: (value: boolean) => void;
  sklad: SkladCode | null;
  onSkladChange: (value: SkladCode | null) => void;
  konkName: string;
  prodName: string;
  action: "next" | "submit" | "none";
  canAdvance: boolean;
  canSubmit: boolean;
  isStarting: boolean;
  onEditStep: (stepId: string) => void;
  onChoice: (stepId: string, value: string) => void;
  onKonk: (value: string) => void;
  onProd: (value: string) => void;
  onEntity: (option: ReportEntityOption) => void;
  onAcknowledge: (stepId: string) => void;
  onSubmit: () => void;
}

export function ExcelReportOrderContainerView(
  props: ExcelReportOrderContainerViewProps,
) {
  const { steps, activeIndex, isStarting, action, canAdvance, canSubmit } = props;
  const active = steps[activeIndex];
  const completed = steps.slice(0, activeIndex);
  const submitLabel =
    active?.type === "ready" ? active.submitLabel : "Замовити";

  return (
    <DetailPanelCard className="p-4">
      <div className="grid gap-4">
        <p className={typography.sectionLabel}>Замовлення</p>

        {completed.length > 0 ? (
          <div className="divide-y divide-border overflow-hidden rounded-md border border-border">
            {completed.map((step) => (
              <button
                key={step.id}
                type="button"
                disabled={isStarting}
                onClick={() => props.onEditStep(step.id)}
                className="grid w-full gap-1 px-3 py-2 text-left hover:bg-muted/40"
              >
                <span className={typography.caption}>{stepTitle(step)}</span>
                <CompletedStepValue step={step} {...props} />
              </button>
            ))}
          </div>
        ) : null}

        {active ? <ActiveStep {...props} step={active} /> : null}

        {action === "next" || action === "submit" ? (
          <div className="flex justify-end border-t border-border pt-4">
            {action === "next" ? (
              <Button
                type="button"
                variant="default"
                disabled={!canAdvance || isStarting || !active}
                onClick={() => active && props.onAcknowledge(active.id)}
              >
                Далі
              </Button>
            ) : (
              <Button
                type="button"
                variant="default"
                disabled={!canSubmit || isStarting}
                onClick={props.onSubmit}
              >
                {isStarting ? "Готуємо..." : submitLabel}
              </Button>
            )}
          </div>
        ) : null}
      </div>
    </DetailPanelCard>
  );
}

function CompletedStepValue(
  props: ExcelReportOrderContainerViewProps & { step: ExcelJourneyStep },
): ReactNode {
  const { step } = props;
  if (step.type === "konk" && step.value !== SKUS_EXCEL_ALL_KONKS_VALUE) {
    const konk = props.konks.find((item) => item.name === step.value);
    const title = konk?.title || step.value;
    return (
      <EntityLabel
        imageUrl={konk?.imageUrl}
        title={title}
        fallbackLabel={title}
        imageSize="xs"
        className={typography.value}
      />
    );
  }
  if (step.type === "prod" && step.value !== SKU_KONK_PROD_QUERY_ALL) {
    const prod = props.prods.find((item) => item.name === step.value);
    const title = prod?.title || step.value;
    return (
      <EntityLabel
        imageUrl={prod?.imageUrl}
        title={title}
        fallbackLabel={title}
        imageSize="xs"
        className={typography.value}
      />
    );
  }
  if (step.type === "entity" && step.selectedTitle) {
    return (
      <EntityLabel
        imageUrl={step.selectedImageUrl}
        title={step.selectedTitle}
        fallbackLabel={step.selectedTitle}
        imageSize="xs"
        className={typography.value}
      />
    );
  }
  if (step.type === "skugr-ids") {
    if (props.skugrPicks.length === 0) {
      return <span className={typography.value}>Без обмеження</span>;
    }
    return (
      <span className="grid gap-1">
        {props.skugrPicks.map((pick) => (
          <EntityLabel
            key={pick.id}
            imageUrl={pick.imageUrl}
            title={pick.title}
            fallbackLabel={pick.title}
            imageSize="xs"
            className={typography.value}
          />
        ))}
      </span>
    );
  }
  return (
    <span className={typography.value}>{stepValueLabel(step, props)}</span>
  );
}

function stepTitle(step: ExcelJourneyStep): string {
  if (step.type === "ready") return "Замовлення";
  return step.prompt;
}

function stepValueLabel(
  step: ExcelJourneyStep,
  props: ExcelReportOrderContainerViewProps,
): string {
  switch (step.type) {
    case "choice":
      return step.options.find((option) => option.id === step.value)?.label ?? step.value;
    case "konk":
      if (step.value === SKUS_EXCEL_ALL_KONKS_VALUE) return "Усі конкуренти";
      return (
        props.konks.find((konk) => konk.name === step.value)?.title || step.value
      );
    case "prod":
      if (step.value === SKU_KONK_PROD_QUERY_ALL) return "Всі виробники";
      return props.prods.find((prod) => prod.name === step.value)?.title || step.value;
    case "entity":
      return step.selectedTitle;
    case "period":
      if (step.mode === "since") {
        return props.since ? format(props.since, "dd.MM.yyyy") : "";
      }
      if (!props.dateRange?.from || !props.dateRange.to) return "";
      return `${format(props.dateRange.from, "dd.MM.yyyy")} — ${format(props.dateRange.to, "dd.MM.yyyy")}`;
    case "stock-metrics":
      return props.stockMetrics
        .map((metric) => SKU_STOCK_EXCEL_METRIC_LABELS[metric])
        .join(", ");
    case "sales-metrics":
      return props.salesMetrics
        .map((metric) => SKU_SALES_EXCEL_METRIC_LABELS[metric])
        .join(", ");
    case "sales-sort":
      return SALES_SORT_LABELS[props.salesSort];
    case "skugr-ids":
      return "Без обмеження";
    case "abc": {
      const letter = props.abc || "Усі";
      return props.sortByAbc ? `${letter}, сортування по ABC` : letter;
    }
    case "sklad":
      return props.sklad ? sklads[props.sklad] : "Всі склади";
    case "ready":
      return step.submitLabel;
    default: {
      const unreachable: never = step;
      return unreachable;
    }
  }
}

function ActiveStep(
  props: ExcelReportOrderContainerViewProps & { step: ExcelJourneyStep },
) {
  const { step, isStarting } = props;
  if (step.type === "ready") return null;

  return (
    <div className="grid gap-3 rounded-lg bg-muted/40 p-4">
      <p className={typography.sectionTitle}>{step.prompt}</p>
      {step.type === "choice" ? (
        <div className="grid gap-2 sm:grid-cols-2">
          {step.options.map((option) => {
            const isSelected = option.id === step.value;
            return (
              <Button
                key={option.id}
                type="button"
                variant={isSelected ? "default" : "outline"}
                className="w-full justify-start"
                disabled={isStarting}
                onClick={() => props.onChoice(step.id, option.id)}
              >
                {option.label}
              </Button>
            );
          })}
        </div>
      ) : null}
      {step.type === "konk" ? (
        <KonkStep
          konks={props.konks}
          value={step.value}
          disabled={isStarting}
          onValueChange={props.onKonk}
        />
      ) : null}
      {step.type === "prod" ? (
        <ProdEntitySelect
          value={step.value}
          onValueChange={props.onProd}
          prods={props.prods}
          showAllProducersOption
          className="w-full min-w-0"
        />
      ) : null}
      {step.type === "entity" ? (
        <ReportEntitySearch
          key={`${step.source}-${step.konkName}`}
          source={step.source}
          konkName={step.konkName}
          selectedId={step.selectedId}
          selectedTitle={step.selectedTitle}
          selectedImageUrl={step.selectedImageUrl}
          onSelect={props.onEntity}
          showFieldLabel={false}
          disabled={isStarting}
        />
      ) : null}
      {step.type === "period" ? (
        <div className="flex justify-center">
          {step.mode === "since" ? (
            <Calendar
              mode="single"
              selected={props.since}
              onSelect={props.onSinceChange}
              disabled={(date) => date > new Date() || isStarting}
            />
          ) : (
            <Calendar
              mode="range"
              selected={props.dateRange}
              onSelect={props.onDateRangeChange}
              disabled={(date) => date > new Date() || isStarting}
              numberOfMonths={1}
            />
          )}
        </div>
      ) : null}
      {step.type === "stock-metrics" ? (
        <SkuStockExcelMetricsControl
          value={props.stockMetrics}
          onChange={props.onStockMetricsChange}
          disabled={isStarting}
        />
      ) : null}
      {step.type === "sales-metrics" ? (
        <SkuSalesExcelMetricsControl
          value={props.salesMetrics}
          onChange={props.onSalesMetricsChange}
          disabled={isStarting}
        />
      ) : null}
      {step.type === "sales-sort" ? (
        <Select
          value={props.salesSort}
          onValueChange={(value) => props.onSalesSortChange(value as ExcelSalesSort)}
          disabled={isStarting}
        >
          <SelectTrigger className="w-full" aria-label="Сортування">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">За замовчуванням</SelectItem>
            <SelectItem value="sales">За кількістю продажів (шт)</SelectItem>
            <SelectItem value="revenue">За виручкою</SelectItem>
          </SelectContent>
        </Select>
      ) : null}
      {step.type === "skugr-ids" ? (
        <SkugrMultiSelectControl
          konkName={props.konkName}
          prodName={
            props.prodName === SKU_KONK_PROD_QUERY_ALL ? "" : props.prodName
          }
          value={props.skugrIds}
          onChange={ignoreSkugrIdsChange}
          onToggleItem={props.onSkugrToggle}
          enabled={Boolean(props.konkName) && props.konkName !== SKUS_EXCEL_ALL_KONKS_VALUE}
          disabled={isStarting}
          searchInputId="excel-report-order-skugr-search"
        />
      ) : null}
      {step.type === "abc" ? (
        <div className="grid gap-4 sm:grid-cols-2 sm:items-end">
          <div className="grid gap-2">
            <Label htmlFor="excel-report-abc">ABC</Label>
            <Select
              value={props.abc || "all"}
              onValueChange={(value) => props.onAbcChange(value === "all" ? "" : value)}
              disabled={isStarting}
            >
              <SelectTrigger id="excel-report-abc" className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ABC_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="excel-report-sort-by-abc"
              checked={props.sortByAbc}
              onCheckedChange={props.onSortByAbcChange}
              disabled={isStarting}
            />
            <Label htmlFor="excel-report-sort-by-abc" className="cursor-pointer">
              Сортувати по ABC
            </Label>
          </div>
        </div>
      ) : null}
      {step.type === "sklad" ? (
        <Select
          value={props.sklad ?? ALL_SKLADS_VALUE}
          onValueChange={(value) =>
            props.onSkladChange(
              value === ALL_SKLADS_VALUE ? null : (value as SkladCode),
            )
          }
          disabled={isStarting}
        >
          <SelectTrigger className="w-full" aria-label="Склад">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_SKLADS_VALUE}>Всі склади</SelectItem>
            <SelectItem value="pogrebi">{sklads.pogrebi}</SelectItem>
            <SelectItem value="merezhi">{sklads.merezhi}</SelectItem>
          </SelectContent>
        </Select>
      ) : null}
    </div>
  );
}

function KonkStep({
  konks,
  value,
  disabled,
  onValueChange,
}: {
  konks: KonkDto[];
  value: string;
  disabled: boolean;
  onValueChange: (value: string) => void;
}) {
  return (
    <Select value={value || undefined} onValueChange={onValueChange} disabled={disabled}>
      <SelectTrigger className="w-full" aria-label="Конкурент">
        <SelectValue placeholder="Оберіть конкурента" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={SKUS_EXCEL_ALL_KONKS_VALUE}>Усі конкуренти</SelectItem>
        {konks.map((konk) => (
          <SelectItem key={konk._id} value={konk.name}>
            <EntityLabel
              imageUrl={konk.imageUrl}
              title={konk.title}
              fallbackLabel={konk.name}
              imageSize="xs"
            />
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
