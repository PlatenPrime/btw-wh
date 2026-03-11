import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { AnalogSalesRangeItem } from "@/modules/analogs/api/types";
import { format, parseISO } from "date-fns";
import { useLayoutEffect, useState } from "react";
import { CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";

const chartConfig = {
  sales: {
    label: "Продажі (шт)",
    color: "var(--chart-6)",
  },
  revenue: {
    label: "Виручка (грн)",
    color: "var(--chart-7)",
  },
} satisfies ChartConfig;

export interface AnalogSalesChartViewProps {
  data: AnalogSalesRangeItem[];
  showSales?: boolean;
  showRevenue?: boolean;
}

function formatDateTick(value: string): string {
  try {
    return format(parseISO(value), "dd.MM");
  } catch {
    return value;
  }
}

function getChartColors(): { chart1: string; chart2: string } {
  if (typeof document === "undefined") {
    return { chart1: "oklch(0.62 0.17 350)", chart2: "oklch(0.58 0.14 195)" };
  }
  const root = document.documentElement;
  const chart1 =
    getComputedStyle(root).getPropertyValue("--chart-6").trim() ||
    "oklch(0.62 0.17 350)";
  const chart2 =
    getComputedStyle(root).getPropertyValue("--chart-7").trim() ||
    "oklch(0.58 0.14 195)";
  return { chart1, chart2 };
}

export function AnalogSalesChartView({
  data,
  showSales = true,
  showRevenue = true,
}: AnalogSalesChartViewProps) {
  const [colors, setColors] = useState(getChartColors);

  useLayoutEffect(() => {
    setColors(getChartColors());
  }, []);

  if (!data.length) {
    return null;
  }

  const hasSales = showSales;
  const hasRevenue = showRevenue;
  const hasAny = hasSales || hasRevenue;

  if (!hasAny) {
    return null;
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="analog-sales-chart w-full max-w-full sm:max-w-xl lg:max-w-2xl aspect-auto min-h-[160px] h-[clamp(160px,32vh,260px)] sm:min-h-[180px] sm:h-[clamp(180px,35vh,280px)] [&_.recharts-wrapper]:!block [&_.recharts-wrapper]:h-full"
    >
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
        {hasSales && (
          <YAxis
            yAxisId="left"
            orientation="left"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => String(v)}
          />
        )}
        {hasRevenue && (
          <YAxis
            yAxisId="right"
            orientation="right"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => `${v} грн`}
          />
        )}
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => {
                const p = payload?.[0]?.payload as
                  | AnalogSalesRangeItem
                  | undefined;
                if (!p) return "";
                const dateStr = format(parseISO(p.date), "dd.MM.yyyy");
                return p.isDeliveryDay
                  ? `${dateStr} • День поставки`
                  : dateStr;
              }}
              formatter={(value, name) => [
                name === "sales" ? value : `${value} грн`,
                name === "sales"
                  ? chartConfig.sales.label
                  : chartConfig.revenue.label,
              ]}
            />
          }
        />
        {hasSales && (
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="sales"
            stroke={colors.chart1}
            strokeWidth={2}
            dot={false}
          />
        )}
        {hasRevenue && (
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="revenue"
            stroke={colors.chart2}
            strokeWidth={2}
            dot={false}
          />
        )}
      </ComposedChart>
    </ChartContainer>
  );
}
