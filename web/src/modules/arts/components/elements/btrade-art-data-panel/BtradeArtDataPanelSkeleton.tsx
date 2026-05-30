import { Skeleton } from "@/components/ui/skeleton";

export function BtradeArtDataPanelSkeleton() {
  return (
    <>
      <div className="grid gap-1">
        <Skeleton className="h-3 w-14" />
        <Skeleton className="h-4 w-10" />
      </div>
      <div className="grid gap-1">
        <Skeleton className="h-3 w-8" />
        <Skeleton className="h-4 w-16" />
      </div>
    </>
  );
}
