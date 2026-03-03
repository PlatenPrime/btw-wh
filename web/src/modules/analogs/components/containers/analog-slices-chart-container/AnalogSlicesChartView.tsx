import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { AnalogSliceRangeItem } from "@/modules/analogs/api/types";
import { format, parseISO } from "date-fns";
import { useId, useLayoutEffect, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  stock: {
    label: "Залишок",
    color: "var(--chart-1)",
  },
  price: {
    label: "Ціна (грн)",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

export type ChartType = "line" | "area";

export interface AnalogSlicesChartViewProps {
  data: AnalogSliceRangeItem[];
  showStock?: boolean;
  showPrice?: boolean;
  chartType?: ChartType;
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

export function AnalogSlicesChartView({
  data,
  showStock = true,
  showPrice = true,
  chartType = "line",
}: AnalogSlicesChartViewProps) {
  const [colors, setColors] = useState(getChartColors);

  useLayoutEffect(() => {
    setColors(getChartColors());
  }, [chartType]);

  if (!data.length) {
    return null;
  }

  const hasStock = showStock;
  const hasPrice = showPrice;
  const hasAny = hasStock || hasPrice;

  if (!hasAny) {
    return null;
  }

  const isArea = chartType === "area";
  const LineOrArea = isArea ? Area : Line;
  const uid = useId().replace(/:/g, "");
  const gradientIdStock = `analog-area-stock-${uid}`;
  const gradientIdPrice = `analog-area-price-${uid}`;

  return (
    <ChartContainer
      config={chartConfig}
      className="analog-slices-chart w-full max-w-full sm:max-w-xl lg:max-w-2xl aspect-auto min-h-[160px] h-[clamp(160px,32vh,260px)] sm:min-h-[180px] sm:h-[clamp(180px,35vh,280px)] [&_.recharts-wrapper]:!block [&_.recharts-wrapper]:h-full"
    >
      <ComposedChart
        data={data}
        margin={{ top: 8, right: 8, bottom: 8, left: 8 }}
      >
        <defs>
          <linearGradient id={gradientIdStock} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.chart1} stopOpacity={0.5} />
            <stop offset="100%" stopColor={colors.chart1} stopOpacity={0} />
          </linearGradient>
          <linearGradient id={gradientIdPrice} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={colors.chart2} stopOpacity={0.5} />
            <stop offset="100%" stopColor={colors.chart2} stopOpacity={0} />
          </linearGradient>
        </defs>
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
                const p = payload?.[0]?.payload as
                  | AnalogSliceRangeItem
                  | undefined;
                return p ? format(parseISO(p.date), "dd.MM.yyyy") : "";
              }}
              formatter={(value, name) => [
                name === "stock" ? value : `${value} грн`,
                name === "stock"
                  ? chartConfig.stock.label
                  : chartConfig.price.label,
              ]}
            />
          }
        />
        {hasStock && (
          <LineOrArea
            yAxisId="left"
            type="monotone"
            dataKey="stock"
            stroke={colors.chart1}
            strokeWidth={2}
            dot={false}
            {...(isArea && {
              fill: `url(#${gradientIdStock})`,
              baseValue: 0,
            })}
          />
        )}
        {hasPrice && (
          <LineOrArea
            yAxisId="right"
            type="monotone"
            dataKey="price"
            stroke={colors.chart2}
            strokeWidth={2}
            dot={false}
            {...(isArea && {
              fill: `url(#${gradientIdPrice})`,
              baseValue: 0,
            })}
          />
        )}
      </ComposedChart>
    </ChartContainer>
  );
}
