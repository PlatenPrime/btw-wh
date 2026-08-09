import { SurfaceSection } from "@/components/shared/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SkuSkugrSkusSalesTotalDto } from "@/modules/sku-analytics/api/types";
import type {
  SkuStatisticsMetric,
  SkuStatisticsSkuRow,
} from "@/modules/sku-analytics/types";
import {
  buildSkuStatisticsSkusExportFilename,
  exportSalesShareTableToXlsx,
} from "@/utils/export-sales-share-table-xlsx";
import { Download } from "lucide-react";
import { useCallback } from "react";
import { Link } from "react-router";

interface SkuStatisticsSkusTableProps {
  rows: SkuStatisticsSkuRow[];
  all: SkuSkugrSkusSalesTotalDto;
  metric: SkuStatisticsMetric;
  skugrId: string;
  dateFrom: string;
  dateTo: string;
  konk?: string;
  prod?: string;
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

export function SkuStatisticsSkusTable({
  rows,
  all,
  metric,
  skugrId,
  dateFrom,
  dateTo,
  konk,
  prod,
}: SkuStatisticsSkusTableProps) {
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
      groupColumnTitle: "Товар",
      filename: buildSkuStatisticsSkusExportFilename(
        skugrId,
        dateFrom,
        dateTo,
        konk,
        prod,
      ),
    });
  }, [rows, metric, skugrId, dateFrom, dateTo, konk, prod]);

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
            <TableHead>Товар</TableHead>
            <TableHead className="text-right">Продажі, шт</TableHead>
            <TableHead className="text-right">Виручка, грн</TableHead>
            <TableHead className="text-right">{shareColumnTitle}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-muted/90 border-b-2 border-primary/25 font-semibold hover:bg-muted/90">
            <TableCell className="max-w-[320px] truncate">
              {all.title || "Усього"}
            </TableCell>
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
            <TableRow key={item.skuId}>
              <TableCell className="max-w-[420px]">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar className="h-10 w-10 shrink-0 rounded-md">
                    {item.imageUrl ? (
                      <AvatarImage
                        src={item.imageUrl}
                        alt=""
                        className="object-contain"
                      />
                    ) : null}
                    <AvatarFallback className="rounded-md text-xs">
                      {(item.title?.slice(0, 2) ?? "?").toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <Link
                    to={`/sku/skus/${item.skuId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-w-0 truncate font-medium hover:underline"
                  >
                    {item.title}
                  </Link>
                </div>
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
