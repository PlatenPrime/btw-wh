import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SkuStatisticsMetric, SkuStatisticsRow } from "@/modules/sku-statistics/types";

interface SkuStatisticsTableProps {
  rows: SkuStatisticsRow[];
  metric: SkuStatisticsMetric;
}

const currencyFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

const unitsFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

const percentFormat = new Intl.NumberFormat("uk-UA", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function SkuStatisticsTable({ rows, metric }: SkuStatisticsTableProps) {
  const shareColumnTitle =
    metric === "salesUah" ? "Частка за виручкою" : "Частка за продажами";

  return (
    <Wrapper className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Виробник</TableHead>
            <TableHead className="text-right">Продажі, шт</TableHead>
            <TableHead className="text-right">Виручка, грн</TableHead>
            <TableHead className="text-right">{shareColumnTitle}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((item) => (
            <TableRow key={item.prodName}>
              <TableCell className="max-w-[320px] truncate">{item.title}</TableCell>
              <TableCell className="text-right">
                {unitsFormat.format(item.salesPcs)}
              </TableCell>
              <TableCell className="text-right">
                {currencyFormat.format(item.salesUah)}
              </TableCell>
              <TableCell className="text-right">{percentFormat.format(item.share)}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
}
