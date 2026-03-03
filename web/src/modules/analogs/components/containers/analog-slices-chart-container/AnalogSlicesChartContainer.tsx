import { ErrorDisplay } from "@/components/shared/error-components";
import { LoadingNoData } from "@/components/shared/loading-states/loading-nodata";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useAnalogSlicesRangeQuery } from "@/modules/analogs/api/hooks/queries/useAnalogSlicesRangeQuery";
import { format, subDays } from "date-fns";
import { useMemo, useState } from "react";
import type { ChartType } from "./AnalogSlicesChartView";
import { AnalogSlicesChartView } from "./AnalogSlicesChartView";
import { AnalogSlicesChartSkeleton } from "./AnalogSlicesChartSkeleton";

const PERIOD_OPTIONS = [
  { value: "7", label: "7 днів" },
  { value: "30", label: "30 днів" },
  { value: "90", label: "90 днів" },
] as const;

const CHART_TYPE_OPTIONS: { value: ChartType; label: string }[] = [
  { value: "line", label: "Лінії" },
  { value: "area", label: "Заливка" },
];

interface AnalogSlicesChartContainerProps {
  analogId: string | undefined;
}

function getPeriod(days: number): { dateFrom: string; dateTo: string } {
  const today = new Date();
  const from = subDays(today, days - 1);
  return {
    dateFrom: format(from, "yyyy-MM-dd"),
    dateTo: format(today, "yyyy-MM-dd"),
  };
}

export function AnalogSlicesChartContainer({
  analogId,
}: AnalogSlicesChartContainerProps) {
  const [periodDays, setPeriodDays] = useState<number>(30);
  const [showStock, setShowStock] = useState(true);
  const [showPrice, setShowPrice] = useState(true);
  const [chartType, setChartType] = useState<ChartType>("line");

  const { dateFrom, dateTo } = useMemo(
    () => getPeriod(periodDays),
    [periodDays],
  );

  const { data, isLoading, error, refetch } = useAnalogSlicesRangeQuery({
    analogId,
    dateFrom,
    dateTo,
  });

  if (!analogId) {
    return (
      <LoadingNoData description="Ідентифікатор аналога не передано для завантаження історії залишків та цін" />
    );
  }

  if (isLoading) {
    return <AnalogSlicesChartSkeleton />;
  }

  if (error) {
    return (
      <ErrorDisplay
        error={error}
        title="Помилка завантаження історії залишків та цін"
        description="Не вдалося завантажити дані для побудови графіка"
        onRetry={() => void refetch()}
        variant="compact"
      />
    );
  }

  const items = data?.data ?? [];
  if (!items.length) {
    return (
      <LoadingNoData description="Немає даних про залишки та ціни за обраний період" />
    );
  }

  if (!showStock && !showPrice) {
    return (
      <div className="text-muted-foreground rounded-md border border-dashed p-4 text-center text-sm">
        Увімкніть хоча б одну серію: Залишок або Ціна.
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="chart-period" className="text-muted-foreground text-sm">
            Період
          </Label>
          <Select
            value={String(periodDays)}
            onValueChange={(v) => setPeriodDays(Number(v))}
          >
            <SelectTrigger id="chart-period" className="w-[120px]" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PERIOD_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="chart-type" className="text-muted-foreground text-sm">
            Тип графіка
          </Label>
          <Select
            value={chartType}
            onValueChange={(v) => setChartType(v as ChartType)}
          >
            <SelectTrigger id="chart-type" className="w-[110px]" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CHART_TYPE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              id="chart-show-stock"
              checked={showStock}
              onCheckedChange={setShowStock}
            />
            <Label
              htmlFor="chart-show-stock"
              className="text-muted-foreground cursor-pointer text-sm"
            >
              Залишок
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch
              id="chart-show-price"
              checked={showPrice}
              onCheckedChange={setShowPrice}
            />
            <Label
              htmlFor="chart-show-price"
              className="text-muted-foreground cursor-pointer text-sm"
            >
              Ціна
            </Label>
          </div>
        </div>
      </div>
      <AnalogSlicesChartView
        data={items}
        showStock={showStock}
        showPrice={showPrice}
        chartType={chartType}
      />
    </div>
  );
}
