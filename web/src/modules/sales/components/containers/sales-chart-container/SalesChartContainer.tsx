import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import type { SalesComparisonDay } from "@/modules/sales/api/types";
import { useState } from "react";
import {
  SalesChartRevenueView,
  SalesChartSalesView,
} from "./SalesChartView";

interface SalesChartContainerProps {
  days: SalesComparisonDay[];
}

export function SalesChartContainer({ days }: SalesChartContainerProps) {
  const [showCompetitor, setShowCompetitor] = useState(true);
  const [showBtrade, setShowBtrade] = useState(true);

  const hasAny = showCompetitor || showBtrade;

  return (
    <div className="grid gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Switch
            id="sales-show-competitor"
            checked={showCompetitor}
            onCheckedChange={setShowCompetitor}
            className="data-[state=checked]:bg-[color:var(--chart-6)]"
          />
          <Label
            htmlFor="sales-show-competitor"
            className="text-muted-foreground cursor-pointer text-sm"
          >
            Конкурент
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="sales-show-btrade"
            checked={showBtrade}
            onCheckedChange={setShowBtrade}
            className="data-[state=checked]:bg-[color:var(--chart-2)]"
          />
          <Label
            htmlFor="sales-show-btrade"
            className="text-muted-foreground cursor-pointer text-sm"
          >
            Btrade
          </Label>
        </div>
      </div>

      {!hasAny && (
        <div className="text-muted-foreground rounded-md border border-dashed p-4 text-center text-sm">
          Увімкніть хоча б одну серію для відображення графіків.
        </div>
      )}

      {hasAny && (
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="overflow-hidden shadow-md">
            <CardHeader className="pb-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Продажі (шт)
              </h3>
            </CardHeader>
            <CardContent>
              <SalesChartSalesView
                data={days}
                showCompetitor={showCompetitor}
                showBtrade={showBtrade}
              />
            </CardContent>
          </Card>
          <Card className="overflow-hidden shadow-md">
            <CardHeader className="pb-2">
              <h3 className="text-muted-foreground text-sm font-medium">
                Виручка (грн)
              </h3>
            </CardHeader>
            <CardContent>
              <SalesChartRevenueView
                data={days}
                showCompetitor={showCompetitor}
                showBtrade={showBtrade}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
