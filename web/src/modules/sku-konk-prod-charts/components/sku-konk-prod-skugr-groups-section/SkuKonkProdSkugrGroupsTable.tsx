import { Wrapper } from "@/components/shared/wrappers/Wrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SkugrGroupSalesRow, SkugrGroupsMetric } from "./types";
import { Link } from "react-router";

interface SkuKonkProdSkugrGroupsTableProps {
  rows: SkugrGroupSalesRow[];
  metric: SkugrGroupsMetric;
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

export function SkuKonkProdSkugrGroupsTable({
  rows,
  metric,
}: SkuKonkProdSkugrGroupsTableProps) {
  const shareColumnTitle =
    metric === "salesUah" ? "Частка за виручкою" : "Частка за продажами";

  return (
    <Wrapper className="p-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Товарна група</TableHead>
            <TableHead className="text-right">Продажі, шт</TableHead>
            <TableHead className="text-right">Виручка, грн</TableHead>
            <TableHead className="text-right">{shareColumnTitle}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((item) => (
            <TableRow key={item.skugrId}>
              <TableCell className="max-w-[320px]">
                <Link
                  to={`/sku/skugrs/${item.skugrId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" truncate font-medium hover:underline"
                >
                  {item.title}
                </Link>
              </TableCell>
              <TableCell className="text-right">
                {unitsFormat.format(item.salesPcs)}
              </TableCell>
              <TableCell className="text-right">
                {currencyFormat.format(item.salesUah)}
              </TableCell>
              <TableCell className="text-right">
                {percentFormat.format(item.share)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Wrapper>
  );
}
