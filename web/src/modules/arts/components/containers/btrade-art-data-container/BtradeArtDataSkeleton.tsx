import { Skeleton } from "@/components/ui/skeleton";

export function BtradeArtDataSkeleton() {
  return (
    <div className="text-foreground grid gap-3 text-sm leading-normal">
      <div className="flex gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-md" />
        <div className="grid flex-1 gap-1.5 pt-0.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>
      </div>
      <div className="flex gap-3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-md" />
        <div className="grid flex-1 gap-1.5 pt-0.5">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
