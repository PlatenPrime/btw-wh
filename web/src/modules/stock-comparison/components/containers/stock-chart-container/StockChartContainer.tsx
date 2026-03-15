import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

  return (
    <div className="grid gap-4">
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
            className="text-muted-foreground cursor-pointer text-sm"
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
            className="text-muted-foreground cursor-pointer text-sm"
          >
            Btrade
          </Label>
        </div>
      </div>

      {!hasAny && (
        <div className="text-muted-foreground rounded-md border border-dashed p-4 text-center text-sm">
          Увімкніть хоча б одну серію для відображення графіка.
        </div>
      )}

      {hasAny && (
        <Card className="overflow-hidden shadow-md">
          <CardHeader className="pb-2">
            <h3 className="text-muted-foreground text-sm font-medium">
              Залишки (шт)
            </h3>
          </CardHeader>
          <CardContent>
            <StockChartStockView
              data={days}
              showCompetitor={showCompetitor}
              showBtrade={showBtrade}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
