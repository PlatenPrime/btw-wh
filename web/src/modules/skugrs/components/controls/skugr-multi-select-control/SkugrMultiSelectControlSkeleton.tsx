import { Skeleton } from "@/components/ui/skeleton";

export function SkugrMultiSelectControlSkeleton() {
  return (
    <div className="grid gap-4">
      <Skeleton className="h-9 w-full" />
      <div className="grid gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="h-12 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}
