import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { SkuSliceRowDto } from "@/modules/sku-slices/api/types";
import { Link } from "react-router";

interface SkuSliceTableContainerProps {
  items: SkuSliceRowDto[];
}

export function SkuSliceTableContainer({ items }: SkuSliceTableContainerProps) {
  if (items.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">Немає рядків у зрізі.</p>
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((row) => (
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
                        className="font-medium text-primary hover:underline"
                      >
                        {row.sku.title}
                      </Link>
                    ) : (
                      <span className="font-mono text-sm">{row.productId}</span>
                    )}
                    {row.sku ? (
                      <p className="text-muted-foreground truncate text-xs font-mono">
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
