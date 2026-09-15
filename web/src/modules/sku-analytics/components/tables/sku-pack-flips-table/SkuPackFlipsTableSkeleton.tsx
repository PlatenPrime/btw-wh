import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import type { SkuPackFlipsTableVariant } from "@/modules/sku-analytics/components/tables/sku-pack-flips-table/SkuPackFlipsTable";

interface SkuPackFlipsTableSkeletonProps {
  variant: SkuPackFlipsTableVariant;
}

const ROWS = 4;

export function SkuPackFlipsTableSkeleton({
  variant,
}: SkuPackFlipsTableSkeletonProps) {
  const showPatched = variant === "patched";

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Товар</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Сусід</TableHead>
            <TableHead className="text-right">Множник</TableHead>
            <TableHead className="text-right">Було</TableHead>
            {showPatched ? (
              <TableHead className="text-right">Після</TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: ROWS }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="grid gap-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-20" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-4 w-8" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="ml-auto h-4 w-24" />
              </TableCell>
              {showPatched ? (
                <TableCell className="text-right">
                  <Skeleton className="ml-auto h-4 w-24" />
                </TableCell>
              ) : null}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
