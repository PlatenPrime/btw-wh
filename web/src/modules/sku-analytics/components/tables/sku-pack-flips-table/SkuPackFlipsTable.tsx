import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { iconSize } from "@/lib/typography";
import type { PackFlipFindingDto } from "@/modules/sku-analytics/api/types";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router";

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

function PackFlipProductCell({ item }: { item: PackFlipFindingDto }) {
  const skuId = item.skuId?.trim() ?? "";
  const imageUrl = item.imageUrl?.trim() ?? "";
  const competitorUrl = item.url?.trim() ?? "";
  const title = item.title || item.productId;
  const fallback = title.slice(0, 2).toUpperCase();

  return (
    <div className="flex min-w-0 items-center gap-3">
      <Avatar className="h-10 w-10 shrink-0 rounded-md">
        {imageUrl ? (
          <AvatarImage src={imageUrl} alt="" className="object-contain" />
        ) : null}
        <AvatarFallback className="rounded-md text-xs">{fallback}</AvatarFallback>
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
        <span className="text-muted-foreground truncate font-mono text-xs">
          {item.productId}
        </span>
        {competitorUrl ? (
          <a
            href={competitorUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary inline-flex min-w-0 items-center gap-1 truncate hover:underline"
          >
            <ExternalLink className={iconSize.ui} />
            На сайті
          </a>
        ) : null}
      </div>
    </div>
  );
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
            <TableHead className="whitespace-nowrap">Порівняно з</TableHead>
            <TableHead className="w-[1%] whitespace-nowrap text-right">
              ×
            </TableHead>
            <TableHead className="whitespace-nowrap text-right">Було</TableHead>
            {showPatched ? (
              <TableHead className="whitespace-nowrap text-right">
                Як має бути
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
                  <PackFlipProductCell item={item} />
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
