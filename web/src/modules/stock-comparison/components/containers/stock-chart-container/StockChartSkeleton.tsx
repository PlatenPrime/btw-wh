import { Skeleton } from "@/components/ui/skeleton";

export function StockChartSkeleton() {
  return (
    <div className="grid gap-2">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="aspect-video w-full min-h-[200px]" />
    </div>
  );
}
