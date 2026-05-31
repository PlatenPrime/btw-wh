import { SurfaceSection } from "@/components/shared/wrappers/SurfaceSection";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SkuStatisticsMetric, SkuStatisticsRow } from "@/modules/sku-analytics/types";
import {
  buildSkuStatisticsManufacturersExportFilename,
  exportSalesShareTableToXlsx,
} from "@/utils/export-sales-share-table-xlsx";
import { Download } from "lucide-react";
import { useCallback, useMemo } from "react";

interface SkuStatisticsTableProps {
  rows: SkuStatisticsRow[];
  metric: SkuStatisticsMetric;
  konk: string;
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

export function SkuStatisticsTable({
  rows,
  metric,
  konk,
  dateFrom,
  dateTo,
}: SkuStatisticsTableProps) {
  const shareColumnTitle =
    metric === "salesUah" ? "Частка за виручкою" : "Частка за продажами";

  const { totalPcs, totalUah } = useMemo(() => {
    return rows.reduce(
      (acc, item) => ({
        totalPcs: acc.totalPcs + item.salesPcs,
        totalUah: acc.totalUah + item.salesUah,
      }),
      { totalPcs: 0, totalUah: 0 },
    );
  }, [rows]);

  const handleExportExcel = useCallback(() => {
    exportSalesShareTableToXlsx({
      rows: rows.map((item) => ({
        label: item.title,
        salesPcs: item.salesPcs,
        salesUah: item.salesUah,
        sharePercent: item.share,
      })),
      metric,
      groupColumnTitle: "Виробник",
      filename: buildSkuStatisticsManufacturersExportFilename(konk, dateFrom, dateTo),
    });
  }, [rows, metric, konk, dateFrom, dateTo]);

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
            <TableHead>Виробник</TableHead>
            <TableHead className="text-right">Продажі, шт</TableHead>
            <TableHead className="text-right">Виручка, грн</TableHead>
            <TableHead className="text-right">{shareColumnTitle}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-muted/90 border-b-2 border-primary/25 font-semibold hover:bg-muted/90">
            <TableCell className="max-w-[320px] truncate">Усього</TableCell>
            <TableCell className="text-right tabular-nums">
              {unitsFormat.format(totalPcs)}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {currencyFormat.format(totalUah)}
            </TableCell>
            <TableCell className="text-right tabular-nums">
              {percentFormat.format(100)}%
            </TableCell>
          </TableRow>
          {rows.map((item) => (
            <TableRow key={item.prodName}>
              <TableCell className="max-w-[320px] truncate">{item.title}</TableCell>
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
