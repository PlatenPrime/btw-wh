import { Skeleton } from "@/components/ui/skeleton";

export function SkugrContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <Skeleton className="h-48 rounded-lg" />
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-24 rounded-lg" />
    </div>
  );
}
