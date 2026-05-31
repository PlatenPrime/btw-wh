import type { StockComparisonDay } from "@/modules/stock-comparison/api/types";
import { useState } from "react";
import {
  StockChartContainerView,
  StockChartToolbar,
} from "./StockChartContainerView";

interface StockChartContainerProps {
  days: StockComparisonDay[];
}

export function StockChartContainer({ days }: StockChartContainerProps) {
  const [showCompetitor, setShowCompetitor] = useState(true);
  const [showBtrade, setShowBtrade] = useState(true);
  const hasAny = showCompetitor || showBtrade;

  return (
    <StockChartContainerView
      days={days}
      showCompetitor={showCompetitor}
      showBtrade={showBtrade}
      hasAny={hasAny}
      toolbar={
        <StockChartToolbar
          showCompetitor={showCompetitor}
          showBtrade={showBtrade}
          onShowCompetitorChange={setShowCompetitor}
          onShowBtradeChange={setShowBtrade}
        />
      }
    />
  );
}
