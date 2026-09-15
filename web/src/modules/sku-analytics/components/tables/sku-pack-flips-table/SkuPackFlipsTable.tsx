import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PackFlipFindingDto } from "@/modules/sku-analytics/api/types";

export type SkuPackFlipsTableVariant = "patched" | "priceOnly" | "ambiguous";

interface SkuPackFlipsTableProps {
  variant: SkuPackFlipsTableVariant;
  items: PackFlipFindingDto[];
}

const numberFormat = new Intl.NumberFormat("uk-UA", {
  maximumFractionDigits: 2,
});

function formatPoint(stock: number, price: number): string {
  return `${numberFormat.format(stock)} / ${numberFormat.format(price)}`;
}

export function SkuPackFlipsTable({ variant, items }: SkuPackFlipsTableProps) {
  const showPatched = variant === "patched";
  const colSpan = showPatched ? 6 : 5;

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Товар</TableHead>
            <TableHead className="whitespace-nowrap">Дата</TableHead>
            <TableHead className="whitespace-nowrap">Сусід</TableHead>
            <TableHead className="w-[1%] whitespace-nowrap text-right">
              Множник
            </TableHead>
            <TableHead className="whitespace-nowrap text-right">
              Було (залишок / ціна)
            </TableHead>
            {showPatched ? (
              <TableHead className="whitespace-nowrap text-right">
                Після (залишок / ціна)
              </TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={colSpan}
                className="text-muted-foreground text-center"
              >
                Немає позицій
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow
                key={`${item.productId}-${item.date}-${item.neighborDate}-${item.kind}`}
              >
                <TableCell className="max-w-[360px]">
                  <div className="grid gap-1">
                    {item.url ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="truncate font-medium underline-offset-4 hover:underline"
                      >
                        {item.title || item.productId}
                      </a>
                    ) : (
                      <span className="truncate font-medium">
                        {item.title || item.productId}
                      </span>
                    )}
                    <span className="text-muted-foreground truncate text-xs">
                      {item.productId}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="whitespace-nowrap tabular-nums">
                  {item.date}
                </TableCell>
                <TableCell className="whitespace-nowrap tabular-nums">
                  {item.neighborDate}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  ×{item.factor}
                </TableCell>
                <TableCell className="whitespace-nowrap text-right tabular-nums">
                  {formatPoint(item.from.stock, item.from.price)}
                </TableCell>
                {showPatched ? (
                  <TableCell className="whitespace-nowrap text-right tabular-nums">
                    {item.patched
                      ? formatPoint(item.patched.stock, item.patched.price)
                      : "—"}
                  </TableCell>
                ) : null}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
