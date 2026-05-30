import { Skeleton } from "@/components/ui/skeleton";

export function SkugrMultiSelectControlSkeleton() {
  return (
    <div className="grid gap-4">
      <Skeleton className="h-9 w-full" />
      <div className="grid gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2 rounded-md p-2">
            <Skeleton className="size-4 shrink-0 rounded-sm" />
            <Skeleton className="size-6 shrink-0 rounded" />
            <Skeleton className="h-4 min-w-0 flex-1" />
          </div>
        ))}
      </div>
    </div>
  );
}
