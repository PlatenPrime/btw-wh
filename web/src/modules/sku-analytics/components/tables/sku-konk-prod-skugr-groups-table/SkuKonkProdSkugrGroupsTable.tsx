import { SurfaceSection } from "@/components/shared/layout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  buildSkuKonkProdSkugrGroupsExportFilename,
  exportSalesShareTableToXlsx,
} from "@/utils/export-sales-share-table-xlsx";
import { Download } from "lucide-react";
import { useCallback } from "react";
import { Link } from "react-router";
import type { SkuKonkProdSkugrGroupsSalesTotalDto } from "@/modules/sku-analytics/api/types";
import type { SkugrGroupSalesRow, SkugrGroupsMetric } from "@/modules/sku-analytics/components/containers/sku-konk-prod-skugr-groups-section/types";

interface SkuKonkProdSkugrGroupsTableProps {
  rows: SkugrGroupSalesRow[];
  all: SkuKonkProdSkugrGroupsSalesTotalDto;
  metric: SkugrGroupsMetric;
  konk: string;
  prod: string;
  dateFrom: string;
  dateTo: string;
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
  all,
  metric,
  konk,
  prod,
  dateFrom,
  dateTo,
}: SkuKonkProdSkugrGroupsTableProps) {
  const shareColumnTitle =
    metric === "salesUah" ? "Частка за виручкою" : "Частка за продажами";

  const handleExportExcel = useCallback(() => {
    exportSalesShareTableToXlsx({
      rows: rows.map((item) => ({
        label: item.title,
        salesPcs: item.salesPcs,
        salesUah: item.salesUah,
        sharePercent: item.share,
      })),
      metric,
      groupColumnTitle: "Товарна група",
      filename: buildSkuKonkProdSkugrGroupsExportFilename(konk, prod, dateFrom, dateTo),
    });
  }, [rows, metric, konk, prod, dateFrom, dateTo]);

  return (
    <SurfaceSection className="grid gap-2 p-0">
      <div className="flex flex-wrap items-center justify-end gap-2 px-3 pt-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={rows.length === 0}
          onClick={handleExportExcel}
          className="gap-2"
        >
          <Download
            className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400"
            aria-hidden
          />
          Завантажити Excel
        </Button>
      </div>
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
          <TableRow className="bg-muted/90 border-b-2 border-primary/25 font-semibold hover:bg-muted/90">
            <TableCell className="max-w-[320px] truncate">Усього</TableCell>
            <TableCell className="text-right tabular-nums">
              {unitsFormat.format(all.salesPcs)}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {currencyFormat.format(all.salesUah)}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {percentFormat.format(100)}%
            </TableCell>
          </TableRow>
          {rows.map((item) => (
            <TableRow key={item.skugrId}>
              <TableCell className="max-w-[320px]">
                <Link
                  to={`/sku/skugrs/${item.skugrId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate font-medium hover:underline"
                >
                  {item.title}
                </Link>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {unitsFormat.format(item.salesPcs)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {currencyFormat.format(item.salesUah)}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {percentFormat.format(item.share)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </SurfaceSection>
  );
}
