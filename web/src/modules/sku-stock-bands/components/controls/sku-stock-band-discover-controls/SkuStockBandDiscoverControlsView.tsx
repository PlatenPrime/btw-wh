import { ChartDateRangeToolbar } from "@/components/shared/charts/chart-date-range-toolbar/ChartDateRangeToolbar";
import { SurfaceSection } from "@/components/shared/layout";
import { Button } from "@/components/ui/button";
import { STOCK_BAND_DISCOVER_MAX_RANGE_DAYS } from "@/modules/sku-stock-bands/constants/discover";
import { differenceInCalendarDays, isValid, parseISO } from "date-fns";

interface SkuStockBandDiscoverControlsViewProps {
  dateFrom: string;
  dateTo: string;
  isSubmitReady: boolean;
  isFetching: boolean;
  onDateRangeChange: (from: string, to: string) => void;
  onSubmit: () => void;
}

function getDaySpan(dateFrom: string, dateTo: string): number | null {
  if (!dateFrom || !dateTo) return null;
  const from = parseISO(dateFrom);
  const to = parseISO(dateTo);
  if (!isValid(from) || !isValid(to) || from > to) return null;
  return differenceInCalendarDays(to, from) + 1;
}

export function SkuStockBandDiscoverControlsView({
  dateFrom,
  dateTo,
  isSubmitReady,
  isFetching,
  onDateRangeChange,
  onSubmit,
}: SkuStockBandDiscoverControlsViewProps) {
  const daySpan = getDaySpan(dateFrom, dateTo);
  const isOverMax =
    daySpan !== null && daySpan > STOCK_BAND_DISCOVER_MAX_RANGE_DAYS;

  return (
    <SurfaceSection className="grid gap-3">
      <div className="flex min-w-0 flex-wrap items-end gap-3">
        <ChartDateRangeToolbar
          layout="inline"
          idPrefix="sku-stock-band-discover"
          dateFrom={dateFrom}
          dateTo={dateTo}
          onDateRangeChange={onDateRangeChange}
        />
        <Button
          type="button"
          variant="default"
          disabled={!isSubmitReady || isFetching || isOverMax}
          onClick={onSubmit}
        >
          {isFetching ? "Шукаю…" : "Знайти"}
        </Button>
      </div>
      {isOverMax ? (
        <p className="text-destructive text-sm">
          Період discover ≤ {STOCK_BAND_DISCOVER_MAX_RANGE_DAYS} днів
        </p>
      ) : null}
    </SurfaceSection>
  );
}
