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
import type { SkuSliceRowDto } from "@/modules/sku-analytics/api/types";
import { Link } from "react-router";

interface SkuSliceTableContainerViewProps {
  items: SkuSliceRowDto[];
  canPatchSlice?: boolean;
  onPatchSlice?: (item: SkuSliceRowDto) => void;
}

export function SkuSliceTableContainerView({
  items,
  canPatchSlice = false,
  onPatchSlice,
}: SkuSliceTableContainerViewProps) {
  const showActions = canPatchSlice && Boolean(onPatchSlice);

  if (items.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">
        Немає невалідних точок за цю дату.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[220px]">Товар</TableHead>
            <TableHead className="w-[1%] whitespace-nowrap text-right">
              Залишок
            </TableHead>
            <TableHead className="w-[1%] whitespace-nowrap text-right">
              Ціна
            </TableHead>
            {showActions ? (
              <TableHead className="w-[1%] whitespace-nowrap text-right">
                Дія
              </TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((row) => {
            const skuId = row.sku?._id ?? "";
            const canPatchItem = showActions && Boolean(skuId);

            return (
              <TableRow key={row.productId}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {row.sku ? (
                      <Avatar className="h-10 w-10 shrink-0 rounded-md">
                        {row.sku.imageUrl ? (
                          <AvatarImage
                            src={row.sku.imageUrl}
                            alt=""
                            className="object-contain"
                          />
                        ) : null}
                        <AvatarFallback className="rounded-md text-xs">
                          {(row.sku.title?.slice(0, 2) ?? "?").toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    ) : null}
                    <div className="min-w-0">
                      {row.sku ? (
                        <Link
                          to={`/sku/skus/${row.sku._id}`}
                          className="text-primary font-medium hover:underline"
                        >
                          {row.sku.title}
                        </Link>
                      ) : (
                        <span className="font-mono text-sm">
                          {row.productId}
                        </span>
                      )}
                      {row.sku ? (
                        <p className="text-muted-foreground truncate font-mono text-xs">
                          {row.productId}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {row.stock}
                </TableCell>
                <TableCell className="text-right tabular-nums">
                  {row.price}
                </TableCell>
                {showActions ? (
                  <TableCell className="text-right">
                    {canPatchItem ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => onPatchSlice?.(row)}
                      >
                        Виправити зріз
                      </Button>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </TableCell>
                ) : null}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
