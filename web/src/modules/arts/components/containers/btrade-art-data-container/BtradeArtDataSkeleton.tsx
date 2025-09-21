import { Skeleton } from "@/components/ui/skeleton";

export function BtradeArtDataSkeleton() {
  return (
    <div className="flex gap-2 text-xs">
      <div className="flex items-center gap-1">
        <Skeleton className="h-4 w-3 rounded" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="flex items-center gap-1">
        <Skeleton className="h-4 w-3 rounded" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}
