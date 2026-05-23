import { ChartSection } from "@/components/shared/charts/chart-section/ChartSection";
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

  const toolbar = (
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
          className="cursor-pointer text-sm text-muted-foreground"
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
          className="cursor-pointer text-sm text-muted-foreground"
        >
          Btrade
        </Label>
      </div>
    </div>
  );

  return (
    <div className="grid gap-4">
      {!hasAny && (
        <div className="rounded-md border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          Увімкніть хоча б одну серію для відображення графіків.
        </div>
      )}

      {hasAny && (
        <div className="grid gap-4 lg:grid-cols-2">
          <ChartSection title="Продажі (шт)" toolbar={toolbar}>
            <SalesChartSalesView
              data={days}
              showCompetitor={showCompetitor}
              showBtrade={showBtrade}
            />
          </ChartSection>
          <ChartSection title="Виручка (грн)">
            <SalesChartRevenueView
              data={days}
              showCompetitor={showCompetitor}
              showBtrade={showBtrade}
            />
          </ChartSection>
        </div>
      )}
    </div>
  );
}
