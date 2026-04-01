import { Skeleton } from "@/components/ui/skeleton";

export function SkugrContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <Skeleton className="h-48 rounded-lg" />
      <Skeleton className="h-8 w-64" />
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <Skeleton className="h-[220px] rounded-lg" />
        <Skeleton className="h-[220px] rounded-lg" />
      </div>
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-24 rounded-lg" />
    </div>
  );
}
