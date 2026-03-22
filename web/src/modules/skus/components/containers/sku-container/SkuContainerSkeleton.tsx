import { Skeleton } from "@/components/ui/skeleton";

export function SkuContainerSkeleton() {
  return (
    <div className="grid gap-4">
      <Skeleton className="h-48 rounded-lg" />
      <Skeleton className="h-8 w-2/3 max-w-md" />
      <Skeleton className="h-24 w-full max-w-sm rounded-lg" />
      <Skeleton className="h-4 w-64" />
    </div>
  );
}
