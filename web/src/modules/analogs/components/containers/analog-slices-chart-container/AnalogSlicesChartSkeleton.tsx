import { Skeleton } from "@/components/ui/skeleton";

export function AnalogSlicesChartSkeleton() {
  return (
    <div className="grid gap-2">
      <div className="flex gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="aspect-video w-full min-h-[200px]" />
    </div>
  );
}
