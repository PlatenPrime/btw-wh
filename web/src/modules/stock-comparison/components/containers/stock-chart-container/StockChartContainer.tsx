import { ChartSection } from "@/components/shared/charts/chart-section/ChartSection";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { StockComparisonDay } from "@/modules/stock-comparison/api/types";
import { useState } from "react";
import { StockChartStockView } from "./StockChartView";

interface StockChartContainerProps {
  days: StockComparisonDay[];
}

export function StockChartContainer({ days }: StockChartContainerProps) {
  const [showCompetitor, setShowCompetitor] = useState(true);
  const [showBtrade, setShowBtrade] = useState(true);

  const hasAny = showCompetitor || showBtrade;

  const toolbar = (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Switch
          id="stock-show-competitor"
          checked={showCompetitor}
          onCheckedChange={setShowCompetitor}
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
          onCheckedChange={setShowBtrade}
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
