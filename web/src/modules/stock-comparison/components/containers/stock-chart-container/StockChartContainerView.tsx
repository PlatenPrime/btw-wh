import { ChartSection } from "@/components/shared/charts/chart-section/ChartSection";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { StockComparisonDay } from "@/modules/stock-comparison/api/types";
import { StockChartStockView } from "@/modules/stock-comparison/components/charts/stock-chart";
import type { ReactNode } from "react";

export interface StockChartContainerViewProps {
  days: StockComparisonDay[];
  showCompetitor: boolean;
  showBtrade: boolean;
  hasAny: boolean;
  toolbar: ReactNode;
}

export function StockChartContainerView({
  days,
  showCompetitor,
  showBtrade,
  hasAny,
  toolbar,
}: StockChartContainerViewProps) {
  return (
    <div className="grid gap-4">
      {!hasAny ? (
        <div className="rounded-md border border-dashed p-4 text-center text-sm text-muted-foreground">
          Увімкніть хоча б одну серію для відображення графіка.
        </div>
      ) : (
        <ChartSection title="Залишки (шт)" toolbar={toolbar}>
          <StockChartStockView
            data={days}
            showCompetitor={showCompetitor}
            showBtrade={showBtrade}
          />
        </ChartSection>
      )}
    </div>
  );
}

export function StockChartToolbar({
  showCompetitor,
  showBtrade,
  onShowCompetitorChange,
  onShowBtradeChange,
}: {
  showCompetitor: boolean;
  showBtrade: boolean;
  onShowCompetitorChange: (value: boolean) => void;
  onShowBtradeChange: (value: boolean) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Switch
          id="stock-show-competitor"
          checked={showCompetitor}
          onCheckedChange={onShowCompetitorChange}
          className="data-[state=checked]:bg-[color:var(--chart-6)]"
        />
        <Label
          htmlFor="stock-show-competitor"
          className="cursor-pointer text-sm text-muted-foreground"
        >
          Конкурент
        </Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch
          id="stock-show-btrade"
          checked={showBtrade}
          onCheckedChange={onShowBtradeChange}
          className="data-[state=checked]:bg-[color:var(--chart-2)]"
        />
        <Label
          htmlFor="stock-show-btrade"
          className="cursor-pointer text-sm text-muted-foreground"
        >
          Btrade
        </Label>
      </div>
    </div>
  );
}
