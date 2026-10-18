import { Skeleton } from "@/components/ui/skeleton";

export function AskDetailsRequesterRowSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div className="flex items-center gap-2">
        <Skeleton className="size-4 shrink-0 rounded-full" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="size-4 shrink-0" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}
