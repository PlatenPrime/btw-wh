import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import type { SkugrGroupSalesRow, SkugrGroupsMetric } from "./types";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

interface SkuKonkProdSkugrGroupsPieProps {
  rows: SkugrGroupSalesRow[];
  metric: SkugrGroupsMetric;
}

const PIE_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--chart-6)",
  "var(--chart-7)",
  "var(--chart-8)",
];

const chartConfig = {
  value: { label: "Значення", color: "var(--chart-1)" },
} satisfies ChartConfig;

const currencyFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

const unitsFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

const percentFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 2,
});

export function SkuKonkProdSkugrGroupsPie({
  rows,
  metric,
}: SkuKonkProdSkugrGroupsPieProps) {
  const chartData = rows.map((item) => ({
    name: item.title,
    share: item.share,
    value: metric === "salesUah" ? item.salesUah : item.salesPcs,
  }));

  return (
    <Wrapper className="grid gap-3">
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[320px] w-full max-w-full"
      >
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={45}
            paddingAngle={2}
          >
            {chartData.map((item, index) => (
              <Cell
                key={`${item.name}-${metric}`}
                fill={PIE_COLORS[index % PIE_COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => {
              if (metric === "salesUah")
                return `${currencyFormat.format(value)} грн`;
              return `${unitsFormat.format(value)} шт`;
            }}
            labelFormatter={(label: string, payload) => {
              const share = payload?.[0]?.payload?.share as number | undefined;
              if (share === undefined) return label;
              return `${label} (${percentFormat.format(share)}%)`;
            }}
          />
        </PieChart>
      </ChartContainer>
    </Wrapper>
  );
}
