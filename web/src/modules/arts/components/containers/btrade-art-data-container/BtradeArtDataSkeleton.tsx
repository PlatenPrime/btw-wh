import { Skeleton } from "@/components/ui/skeleton";

export function BtradeArtDataSkeleton() {
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}
