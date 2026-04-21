import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { SliceRangeChartPoint } from "@/types/charts-range";
import { format, parseISO } from "date-fns";
import { useLayoutEffect, useState } from "react";
import { CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";

const chartConfig = {
  stock: {
    label: "Залишок ",
    color: "var(--chart-1)",
  },
  price: {
    label: "Ціна ",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export interface SliceRangeChartViewProps {
  data: SliceRangeChartPoint[];
  showStock?: boolean;
  showPrice?: boolean;
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
    return { chart1: "oklch(0.58 0.17 277)", chart2: "oklch(0.51 0.2 277)" };
  }
  const root = document.documentElement;
  const chart1 =
    getComputedStyle(root).getPropertyValue("--chart-1").trim() ||
    "oklch(0.58 0.17 277)";
  const chart2 =
    getComputedStyle(root).getPropertyValue("--chart-2").trim() ||
    "oklch(0.51 0.2 277)";
  return { chart1, chart2 };
}

export function SliceRangeChartView({
  data,
  showStock = true,
  showPrice = true,
}: SliceRangeChartViewProps) {
  const [colors, setColors] = useState(getChartColors);

  useLayoutEffect(() => {
    setColors(getChartColors());
  }, []);

  if (!data.length) {
    return null;
  }

  const hasStock = showStock;
  const hasPrice = showPrice;
  const hasAny = hasStock || hasPrice;

  if (!hasAny) {
    return null;
  }

  return (
    <ChartContainer
      config={chartConfig}
      className="slice-range-chart aspect-auto h-[clamp(160px,32vh,260px)] min-h-[160px] w-full max-w-full sm:h-[clamp(180px,35vh,280px)] sm:min-h-[180px] sm:max-w-xl lg:max-w-2xl [&_.recharts-wrapper]:!block [&_.recharts-wrapper]:h-full"
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
        {hasStock && (
          <YAxis
            yAxisId="left"
            orientation="left"
            tickLine={false}
            axisLine={false}
            tickFormatter={(v) => String(v)}
          />
        )}
        {hasPrice && (
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
                const p = payload?.[0]?.payload as SliceRangeChartPoint | undefined;
                return p ? format(parseISO(p.date), "dd.MM.yyyy") : "";
              }}
              formatter={(value, name) => [
                name === "stock"
                  ? chartConfig.stock.label
                  : chartConfig.price.label,
                name === "stock" ? `${value} шт` : `${value} грн`,
              ]}
            />
          }
        />
        {hasStock && (
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="stock"
            stroke={colors.chart1}
            strokeWidth={2}
            dot={false}
          />
        )}
        {hasPrice && (
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="price"
            stroke={colors.chart2}
            strokeWidth={2}
            dot={false}
          />
        )}
      </ComposedChart>
    </ChartContainer>
  );
}
