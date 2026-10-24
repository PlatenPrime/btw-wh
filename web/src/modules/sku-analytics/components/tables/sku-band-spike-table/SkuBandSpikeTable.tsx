import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DiscoverBandSpikeItemDto } from "@/modules/sku-analytics/api/types";
import { Link } from "react-router";

export interface SkuBandSpikeCorrectTarget {
  skuId: string;
  title: string;
  dateFrom: string;
  dateTo: string;
  stockMin: number;
  stockMax: number;
}

interface SkuBandSpikeTableProps {
  items: DiscoverBandSpikeItemDto[];
  stockMin: number;
  stockMax: number;
  canCorrect: boolean;
  onCorrect: (target: SkuBandSpikeCorrectTarget) => void;
}

const numberFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

function toDateLabel(value: string): string {
  return value.slice(0, 10);
}

export function SkuBandSpikeTable({
  items,
  stockMin,
  stockMax,
  canCorrect,
  onCorrect,
}: SkuBandSpikeTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Товар</TableHead>
            <TableHead>productId</TableHead>
            <TableHead>Runs</TableHead>
            {canCorrect ? (
              <TableHead className="w-[1%] whitespace-nowrap text-right">
                Дія
              </TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={canCorrect ? 4 : 3}
                className="text-muted-foreground text-center"
              >
                Кандидатів немає
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => {
              const skuId = item.skuId?.trim() ?? "";
              const title = item.title?.trim() || item.productId;
              const primaryRun = item.runs[0];

              return (
                <TableRow key={`${item.productId}-${skuId || "none"}`}>
                  <TableCell>
                    <div className="grid min-w-0 gap-1">
                      {skuId ? (
                        <Link
                          to={`/sku/skus/${skuId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-w-0 truncate font-medium hover:underline"
                        >
                          {title}
                        </Link>
                      ) : (
                        <span className="truncate font-medium">{title}</span>
                      )}
                      {!skuId ? (
                        <span className="text-muted-foreground text-xs">
                          SKU документ не знайдено
                        </span>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {item.productId}
                  </TableCell>
                  <TableCell>
                    <ul className="grid gap-1 text-sm">
                      {item.runs.map((run) => (
                        <li
                          key={`${run.dateFrom}-${run.dateTo}-${run.peakStock}`}
                          className="text-muted-foreground"
                        >
                          {toDateLabel(run.dateFrom)}–
                          {toDateLabel(run.dateTo)} · peak{" "}
                          <span className="text-foreground tabular-nums">
                            {numberFormat.format(run.peakStock)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  {canCorrect ? (
                    <TableCell className="text-right">
                      {skuId && primaryRun ? (
                        <Button
                          type="button"
                          size="sm"
                          variant="edit"
                          onClick={() =>
                            onCorrect({
                              skuId,
                              title,
                              dateFrom: primaryRun.dateFrom.slice(0, 10),
                              dateTo: primaryRun.dateTo.slice(0, 10),
                              stockMin,
                              stockMax,
                            })
                          }
                        >
                          Виправити
                        </Button>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </TableCell>
                  ) : null}
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
