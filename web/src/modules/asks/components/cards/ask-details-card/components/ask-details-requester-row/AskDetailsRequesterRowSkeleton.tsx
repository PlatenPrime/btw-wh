import { Skeleton } from "@/components/ui/skeleton";

export function AskDetailsRequesterRowSkeleton() {
  return (
    <div className="border-border/40 flex items-center justify-between gap-4 border-t px-4 py-2.5">
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
