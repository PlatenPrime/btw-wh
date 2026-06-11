import { Skeleton } from "@/components/ui/skeleton";

export function BtradeArtDataPanelSkeleton() {
  return (
    <div className="bg-muted/30 grid gap-2.5 rounded-lg p-3">
      <Skeleton className="h-3.5 w-16" />
      <div className="flex gap-3">
        <div className="grid gap-1">
          <Skeleton className="h-3 w-14" />
          <Skeleton className="h-4 w-10" />
        </div>
        <div className="grid gap-1">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
}
