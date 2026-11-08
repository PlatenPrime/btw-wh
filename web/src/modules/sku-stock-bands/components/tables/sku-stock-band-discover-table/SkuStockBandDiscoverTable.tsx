import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DiscoverStockBandItemDto } from "@/modules/sku-stock-bands/api/types";
import { Link } from "react-router";

interface SkuStockBandDiscoverTableProps {
  items: DiscoverStockBandItemDto[];
  selectedProductIds: Set<string>;
  onToggleProductId: (productId: string, checked: boolean) => void;
  onToggleAll: (checked: boolean) => void;
}

const numberFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 0,
});

function toUaDate(value: string): string {
  const [year, month, day] = value.slice(0, 10).split("-");
  if (!year || !month || !day) return value.slice(0, 10);
  return `${day}.${month}.${year}`;
}

export function SkuStockBandDiscoverTable({
  items,
  selectedProductIds,
  onToggleProductId,
  onToggleAll,
}: SkuStockBandDiscoverTableProps) {
  const selectableIds = items.map((item) => item.productId);
  const allSelected =
    selectableIds.length > 0 &&
    selectableIds.every((id) => selectedProductIds.has(id));
  const someSelected =
    !allSelected && selectableIds.some((id) => selectedProductIds.has(id));

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[1%] text-center">
              <Checkbox
                aria-label="Обрати всі"
                checked={allSelected ? true : someSelected ? "indeterminate" : false}
                onCheckedChange={(value) => onToggleAll(value === true)}
                disabled={selectableIds.length === 0}
              />
            </TableHead>
            <TableHead>Товар</TableHead>
            <TableHead>Збільшення залишку</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
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
              const checked = selectedProductIds.has(item.productId);

              return (
                <TableRow key={item.productId}>
                  <TableCell className="text-center">
                    <Checkbox
                      aria-label={`Обрати ${title}`}
                      checked={checked}
                      onCheckedChange={(value) =>
                        onToggleProductId(item.productId, value === true)
                      }
                    />
                  </TableCell>
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
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
