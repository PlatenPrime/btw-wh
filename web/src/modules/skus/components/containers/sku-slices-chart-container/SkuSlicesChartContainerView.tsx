import { DataRefetchOverlay } from "@/components/shared/data-refetch-overlay/DataRefetchOverlay";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { SliceRangeChartView } from "@/components/shared/charts/slice-range-chart";
import type { SliceRangeChartPoint } from "@/types/charts-range";

export interface SkuSlicesChartContainerViewProps {
  items: SliceRangeChartPoint[];
  showStock: boolean;
  showPrice: boolean;
  onShowStockChange: (value: boolean) => void;
  onShowPriceChange: (value: boolean) => void;
  isFetching: boolean;
  isLoading: boolean;
}

export function SkuSlicesChartContainerView({
  items,
  showStock,
  showPrice,
  onShowStockChange,
  onShowPriceChange,
  isFetching,
  isLoading,
}: SkuSlicesChartContainerViewProps) {
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
            className="text-muted-foreground cursor-pointer text-sm"
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
            className="text-muted-foreground cursor-pointer text-sm"
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
          <div className="text-muted-foreground rounded-md border border-dashed p-4 text-center text-sm">
            Увімкніть хоча б одну серію: Залишок або Ціна.
          </div>
        )}
      </DataRefetchOverlay>
    </div>
  );
}
