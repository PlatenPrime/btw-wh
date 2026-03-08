import { ArtikulImageLink } from "@/components/shared/artikul-image-link/ArtikulImageLink";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { IAnalogSliceDataItem } from "@/modules/analog-slices/api/types";

interface AnalogSliceTableContainerProps {
  data: Record<string, IAnalogSliceDataItem>;
}

export function AnalogSliceTableContainer({ data }: AnalogSliceTableContainerProps) {
  const entries = Object.entries(data);

  if (entries.length === 0) {
    return (
      <p className="text-muted-foreground text-sm">Немає даних у зрізі.</p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[200px]">Артикул</TableHead>
            <TableHead className="w-[1%] whitespace-nowrap text-right">
              Залишок
            </TableHead>
            <TableHead className="w-[1%] whitespace-nowrap text-right">
              Ціна
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map(([artikul, item]) => (
            <TableRow key={artikul}>
              <TableCell>
                <ArtikulImageLink artikul={artikul} target="_self" />
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {item.stock}
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {item.price}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
