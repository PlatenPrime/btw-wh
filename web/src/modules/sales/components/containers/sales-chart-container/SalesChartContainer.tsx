import type { SalesComparisonDay } from "@/modules/sales/api/types";
import { useState } from "react";
import {
  SalesChartContainerView,
  SalesChartToolbar,
} from "./SalesChartContainerView";

interface SalesChartContainerProps {
  days: SalesComparisonDay[];
}

export function SalesChartContainer({ days }: SalesChartContainerProps) {
  const [showCompetitor, setShowCompetitor] = useState(true);
  const [showBtrade, setShowBtrade] = useState(true);
  const hasAny = showCompetitor || showBtrade;

  return (
    <SalesChartContainerView
      days={days}
      showCompetitor={showCompetitor}
      showBtrade={showBtrade}
      hasAny={hasAny}
      onShowCompetitorChange={setShowCompetitor}
      onShowBtradeChange={setShowBtrade}
      toolbar={
        <SalesChartToolbar
          showCompetitor={showCompetitor}
          showBtrade={showBtrade}
          onShowCompetitorChange={setShowCompetitor}
          onShowBtradeChange={setShowBtrade}
        />
      }
    />
  );
}
