import { Skeleton } from "@/components/ui/skeleton";

export function BtradeArtDataSkeleton() {
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2">
        <Skeleton className="size-8 shrink-0 rounded-md" />
        <div className="grid min-w-0 flex-1 gap-1.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="size-8 shrink-0 rounded-md" />
        <div className="grid min-w-0 flex-1 gap-1.5">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
