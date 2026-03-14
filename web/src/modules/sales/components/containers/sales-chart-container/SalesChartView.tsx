import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { SalesComparisonDay } from "@/modules/sales/api/types";
import { format, parseISO } from "date-fns";
import { useLayoutEffect, useState } from "react";
import { CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";

const salesChartConfig = {
  competitorSales: {
    label: "Конкурент",
    color: "var(--chart-1)",
  },
  btradeSales: {
    label: "Btrade",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const revenueChartConfig = {
  competitorRevenue: {
    label: "Конкурент",
    color: "var(--chart-1)",
  },
  btradeRevenue: {
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
    return {
      chart1: "oklch(0.65 0.20 25)",
      chart2: "oklch(0.55 0.20 250)",
    };
  }
  const root = document.documentElement;
  const get = (v: string, fb: string) =>
    getComputedStyle(root).getPropertyValue(v).trim() || fb;
  return {
    chart1: get("--chart-1", "oklch(0.65 0.20 25)"),
    chart2: get("--chart-2", "oklch(0.55 0.20 250)"),
  };
}

interface SalesChartViewProps {
  data: SalesComparisonDay[];
  showCompetitor: boolean;
  showBtrade: boolean;
}

const CHART_CLASS =
  "w-full max-w-full aspect-auto min-h-[180px] h-[clamp(180px,35vh,300px)] [&_.recharts-wrapper]:!block [&_.recharts-wrapper]:h-full";

export function SalesChartSalesView({
  data,
  showCompetitor,
  showBtrade,
}: SalesChartViewProps) {
  const [colors, setColors] = useState(getChartColors);

  useLayoutEffect(() => {
    setColors(getChartColors());
  }, []);

  if (!data.length || (!showCompetitor && !showBtrade)) return null;

  return (
    <ChartContainer config={salesChartConfig} className={CHART_CLASS}>
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
                  | SalesComparisonDay
                  | undefined;
                if (!p) return "";
                return format(parseISO(p.date), "dd.MM.yyyy");
              }}
              formatter={(value, name) => [
                name === "competitorSales"
                  ? salesChartConfig.competitorSales.label
                  : salesChartConfig.btradeSales.label,
                ` ${value} шт `,
              ]}
            />
          }
        />
        {showCompetitor && (
          <Line
            type="monotone"
            dataKey="competitorSales"
            stroke={colors.chart1}
            strokeWidth={2}
            dot={false}
          />
        )}
        {showBtrade && (
          <Line
            type="monotone"
            dataKey="btradeSales"
            stroke={colors.chart2}
            strokeWidth={2}
            dot={false}
          />
        )}
      </ComposedChart>
    </ChartContainer>
  );
}

export function SalesChartRevenueView({
  data,
  showCompetitor,
  showBtrade,
}: SalesChartViewProps) {
  const [colors, setColors] = useState(getChartColors);

  useLayoutEffect(() => {
    setColors(getChartColors());
  }, []);

  if (!data.length || (!showCompetitor && !showBtrade)) return null;

  return (
    <ChartContainer config={revenueChartConfig} className={CHART_CLASS}>
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
          tickFormatter={(v) => `${v} ₴`}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => {
                const p = payload?.[0]?.payload as
                  | SalesComparisonDay
                  | undefined;
                if (!p) return "";
                return format(parseISO(p.date), "dd.MM.yyyy");
              }}
              formatter={(value, name) => [
                name === "competitorRevenue"
                  ? revenueChartConfig.competitorRevenue.label
                  : revenueChartConfig.btradeRevenue.label,
                ` ${value} грн `,
              ]}
            />
          }
        />
        {showCompetitor && (
          <Line
            type="monotone"
            dataKey="competitorRevenue"
            stroke={colors.chart1}
            strokeWidth={2}
            dot={false}
          />
        )}
        {showBtrade && (
          <Line
            type="monotone"
            dataKey="btradeRevenue"
            stroke={colors.chart2}
            strokeWidth={2}
            dot={false}
          />
        )}
      </ComposedChart>
    </ChartContainer>
  );
}
