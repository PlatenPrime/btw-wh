import { SliceRangeChartView } from "@/components/shared/charts/slice-range-chart";
import type { SliceRangeChartPoint } from "@/types/charts-range";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface AnalogSlicesChartViewProps {
  items: SliceRangeChartPoint[];
  showStock: boolean;
  onShowStockChange: (value: boolean) => void;
  showPrice: boolean;
  onShowPriceChange: (value: boolean) => void;
}

export function AnalogSlicesChartView({
  items,
  showStock,
  onShowStockChange,
  showPrice,
  onShowPriceChange,
}: AnalogSlicesChartViewProps) {
  const showChart = showStock || showPrice;

  return (
    <div className="grid gap-3">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="chart-show-stock"
            checked={showStock}
            onCheckedChange={onShowStockChange}
            className="data-[state=checked]:bg-[color:var(--chart-1)]"
          />
          <Label
            htmlFor="chart-show-stock"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Залишок
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="chart-show-price"
            checked={showPrice}
            onCheckedChange={onShowPriceChange}
            className="data-[state=checked]:bg-[color:var(--chart-2)]"
          />
          <Label
            htmlFor="chart-show-price"
            className="cursor-pointer text-sm text-muted-foreground"
          >
            Ціна
          </Label>
        </div>
      </div>
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
    </div>
  );
}
