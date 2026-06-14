import { Skeleton } from "@/components/ui/skeleton";

export function BtradeArtDataPanelSkeleton() {
  return (
    <div className="bg-muted/30 grid gap-2.5 rounded-lg p-3">
      <Skeleton className="h-3.5 w-16" />
      <div className="flex flex-wrap gap-6">
        <div className="flex items-start gap-2">
          <Skeleton className="mt-0.5 size-4 shrink-0 rounded-sm" />
          <div className="grid gap-1">
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Skeleton className="mt-0.5 size-4 shrink-0 rounded-sm" />
          <div className="grid gap-1">
            <Skeleton className="h-3 w-8" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
