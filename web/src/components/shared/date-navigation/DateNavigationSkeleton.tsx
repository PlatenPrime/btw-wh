import { Skeleton } from "@/components/ui/skeleton";

export function DateNavigationSkeleton() {
  return (
    <div className="flex items-center justify-start gap-2">
      <div className="flex items-center justify-between gap-2">
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
      <Skeleton className="h-5 w-24" />
    </div>
  );
}
