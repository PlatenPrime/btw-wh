import { Skeleton } from "@/components/ui/skeleton";

export function AskDetailsProductHeaderSkeleton() {
  return (
    <div className="flex items-start justify-between gap-3">
      <div className="flex min-w-0 flex-1 items-start gap-4">
        <Skeleton className="size-16 shrink-0 rounded-lg sm:size-20" />
        <div className="grid min-w-0 flex-1 gap-2">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
      </div>
      <Skeleton className="h-5 w-20 shrink-0 rounded-md" />
    </div>
  );
}
