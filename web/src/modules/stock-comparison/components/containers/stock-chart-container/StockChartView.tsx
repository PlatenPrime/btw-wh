import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { StockComparisonDay } from "@/modules/stock-comparison/api/types";
import { format, parseISO } from "date-fns";
import { useLayoutEffect, useState } from "react";
import { CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";

const stockChartConfig = {
  competitorStock: {
    label: "Конкурент",
    color: "var(--chart-6)",
  },
  btradeStock: {
    label: "Btrade",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

function formatDateTick(value: string): string {
  try {
    return format(parseISO(value), "dd.MM");
  } catch {
    return value;
  }
}

function getChartColors() {
  if (typeof document === "undefined") {
    return { chart2: "oklch(0.55 0.20 250)" };
  }
  const root = document.documentElement;
  const get = (v: string, fb: string) =>
    getComputedStyle(root).getPropertyValue(v).trim() || fb;
  return {
    chart2: get("--chart-2", "oklch(0.55 0.20 250)"),
  };
}

interface StockChartViewProps {
  data: StockComparisonDay[];
  showCompetitor: boolean;
  showBtrade: boolean;
}

const CHART_CLASS =
  "w-full max-w-full aspect-auto min-h-[180px] h-[clamp(180px,35vh,300px)] [&_.recharts-wrapper]:!block [&_.recharts-wrapper]:h-full";

export function StockChartStockView({
  data,
  showCompetitor,
  showBtrade,
}: StockChartViewProps) {
  const [colors, setColors] = useState(getChartColors);

  useLayoutEffect(() => {
    setColors(getChartColors());
  }, []);

  if (!data.length || (!showCompetitor && !showBtrade)) return null;

  return (
    <ChartContainer config={stockChartConfig} className={CHART_CLASS}>
      <ComposedChart
        data={data}
        margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="date"
          tickFormatter={formatDateTick}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => String(v)}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => {
                const p = payload?.[0]?.payload as
                  | StockComparisonDay
                  | undefined;
                if (!p) return "";
                return format(parseISO(p.date), "dd.MM.yyyy");
              }}
              formatter={(value, name) => [
                name === "competitorStock"
                  ? stockChartConfig.competitorStock.label
                  : stockChartConfig.btradeStock.label,
                ` ${value} шт `,
              ]}
            />
          }
        />
        {showCompetitor && (
          <Line
            type="monotone"
            dataKey="competitorStock"
            stroke="var(--chart-6)"
            strokeWidth={2}
            dot={false}
          />
        )}
        {showBtrade && (
          <Line
            type="monotone"
            dataKey="btradeStock"
            stroke={colors.chart2}
            strokeWidth={2}
            dot={false}
          />
        )}
      </ComposedChart>
    </ChartContainer>
  );
}
