import { DataRefetchOverlay } from "@/components/shared/feedback/data-refetch-overlay/DataRefetchOverlay";
import { SliceRangeChartView } from "@/components/shared/charts/slice-range-chart";
import type { SliceRangeChartPoint } from "@/types/charts-range";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export interface SkuSlicesChartViewProps {
  items: SliceRangeChartPoint[];
  showStock: boolean;
  showPrice: boolean;
  onShowStockChange: (value: boolean) => void;
  onShowPriceChange: (value: boolean) => void;
  isFetching: boolean;
  isLoading: boolean;
}

export function SkuSlicesChartView({
  items,
  showStock,
  showPrice,
  onShowStockChange,
  onShowPriceChange,
  isFetching,
  isLoading,
}: SkuSlicesChartViewProps) {
  const showChart = showStock || showPrice;

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="sku-chart-show-stock"
            checked={showStock}
            onCheckedChange={onShowStockChange}
            className="data-[state=checked]:bg-[color:var(--chart-1)]"
          />
          <Label
            htmlFor="sku-chart-show-stock"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Залишок
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="sku-chart-show-price"
            checked={showPrice}
            onCheckedChange={onShowPriceChange}
            className="data-[state=checked]:bg-[color:var(--chart-2)]"
          />
          <Label
            htmlFor="sku-chart-show-price"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Ціна
          </Label>
        </div>
      </div>
      <DataRefetchOverlay isFetching={isFetching} isLoading={isLoading}>
        {showChart ? (
          <SliceRangeChartView
            data={items}
            showStock={showStock}
            showPrice={showPrice}
          />
        ) : (
          <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
            Увімкніть хоча б одну серію: Залишок або Ціна.
          </div>
        )}
      </DataRefetchOverlay>
    </div>
  );
}
