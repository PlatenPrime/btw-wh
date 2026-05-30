import { Skeleton } from "@/components/ui/skeleton";

export function AskDetailsProductHeaderSkeleton() {
  return (
    <div className="flex items-start justify-between gap-3 p-4">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <Skeleton className="size-14 shrink-0 rounded-lg" />
        <div className="grid min-w-0 flex-1 gap-1">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-full max-w-[260px]" />
          <Skeleton className="h-4 w-3/4 max-w-[180px]" />
        </div>
      </div>
      <Skeleton className="h-5 w-20 shrink-0 rounded-md" />
    </div>
  );
}
