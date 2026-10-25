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

function toUaDate(value: string): string {
  const [year, month, day] = value.slice(0, 10).split("-");
  if (!year || !month || !day) return value.slice(0, 10);
  return `${day}.${month}.${year}`;
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
            <TableHead>Збільшення залишку</TableHead>
            {canCorrect ? (
              <TableHead className="w-[1%] whitespace-nowrap text-center">
                Дія
              </TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={canCorrect ? 3 : 2}
                className="text-muted-foreground text-center"
              >
                Артикулів немає
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => {
              const skuId = item.skuId?.trim() ?? "";
              const title = item.title?.trim() || item.productId;
              const imageUrl = item.imageUrl?.trim() ?? "";
              const primaryRun = item.runs[0];

              return (
                <TableRow key={`${item.productId}-${skuId || "none"}`}>
                  <TableCell className="max-w-[360px]">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="h-10 w-10 shrink-0 rounded-md">
                        {imageUrl ? (
                          <AvatarImage
                            src={imageUrl}
                            alt=""
                            className="object-contain"
                          />
                        ) : null}
                        <AvatarFallback className="rounded-md text-xs">
                          {title.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
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
                    </div>
                  </TableCell>
                  <TableCell>
                    <ul className="grid gap-1">
                      {item.runs.map((run) => (
                        <li
                          key={`${run.dateFrom}-${run.dateTo}-${run.peakStock}`}
                          className="text-muted-foreground tabular-nums"
                        >
                          {toUaDate(run.dateFrom)} — {toUaDate(run.dateTo)} ·{" "}
                          {numberFormat.format(run.peakStock)}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  {canCorrect ? (
                    <TableCell className="text-center">
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
