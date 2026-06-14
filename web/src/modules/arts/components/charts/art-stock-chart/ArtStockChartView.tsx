import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type { ArtStockChartDay } from "@/modules/arts/api/types/art-reports";
import { ART_CHART_PLOT_CLASS } from "@/modules/arts/components/charts/art-chart-plot-height";
import { cn } from "@/lib/utils";
import { format, parseISO } from "date-fns";
import { useLayoutEffect, useState } from "react";
import { CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";

const chartConfig = {
  quantity: {
    label: "Залишок ",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export interface ArtStockChartViewProps {
  data: ArtStockChartDay[];
}

function formatDateTick(value: string): string {
  try {
    return format(parseISO(value), "dd.MM");
  } catch {
    return value;
  }
}

function getChartColor(): string {
  if (typeof document === "undefined") {
    return "oklch(0.58 0.17 277)";
  }
  const root = document.documentElement;
  return (
    getComputedStyle(root).getPropertyValue("--chart-1").trim() ||
    "oklch(0.58 0.17 277)"
  );
}

export function ArtStockChartView({ data }: ArtStockChartViewProps) {
  const [color, setColor] = useState(getChartColor);

  useLayoutEffect(() => {
    setColor(getChartColor());
  }, []);

  if (!data.length) {
    return null;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ChartContainer
        config={chartConfig}
        className={cn("art-stock-chart", ART_CHART_PLOT_CLASS)}
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
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(v) => String(v)}
        />
        <ChartTooltip
          content={
            <ChartTooltipContent
              labelFormatter={(_, payload) => {
                const p = payload?.[0]?.payload as ArtStockChartDay | undefined;
                return p ? format(parseISO(p.date), "dd.MM.yyyy") : "";
              }}
              formatter={(value) => [
                chartConfig.quantity.label,
                `${value} шт`,
              ]}
            />
          }
        />
        <Line
          type="monotone"
          dataKey="quantity"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ChartContainer>
    </div>
  );
}
