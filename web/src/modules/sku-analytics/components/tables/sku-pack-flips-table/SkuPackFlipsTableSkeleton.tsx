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
            <TableHead>
              <Skeleton className="h-3 w-16" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-3 w-12" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-3 w-12" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="ml-auto h-3 w-16" />
            </TableHead>
            <TableHead className="text-right">
              <Skeleton className="ml-auto h-3 w-20" />
            </TableHead>
            {showPatched ? (
              <TableHead className="text-right">
                <Skeleton className="ml-auto h-3 w-20" />
              </TableHead>
            ) : null}
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: ROWS }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 shrink-0 rounded-md" />
                  <div className="grid gap-1">
                    <Skeleton className="h-4 w-48" />
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-36" />
                  </div>
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
