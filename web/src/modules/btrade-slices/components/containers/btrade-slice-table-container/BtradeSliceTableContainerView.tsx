import { ArtikulImageLink } from "@/components/shared/media/artikul-image-link/ArtikulImageLink";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BtradeSliceRowDto } from "@/modules/btrade-slices/api/types";

export interface BtradeSliceTableContainerViewProps {
  items: BtradeSliceRowDto[];
}

export function BtradeSliceTableContainerView({
  items,
}: BtradeSliceTableContainerViewProps) {
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
            <TableHead className="min-w-[220px]">Артикул</TableHead>
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
            <TableRow key={row.artikul}>
              <TableCell>
                {row.art ? (
                  <ArtikulImageLink
                    artikul={row.artikul}
                    nameukr={row.art.nameukr}
                    target="_self"
                  />
                ) : (
                  <span className="font-mono text-sm">{row.artikul}</span>
                )}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {row.quantity}
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
