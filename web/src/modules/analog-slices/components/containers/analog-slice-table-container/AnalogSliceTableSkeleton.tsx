import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const ROWS = 8;

export function AnalogSliceTableSkeleton() {
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
          {Array.from({ length: ROWS }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 shrink-0 rounded" />
                  <div className="flex flex-col gap-1">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-4 w-12" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-4 w-14" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
