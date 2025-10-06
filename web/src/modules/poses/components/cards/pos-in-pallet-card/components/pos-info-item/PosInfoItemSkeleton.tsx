import { Skeleton } from "@/components/ui/skeleton";

export function PosInfoItemSkeleton() {
  return (
    <div className="bg-muted/30 flex min-h-[2rem] items-center justify-center gap-1 rounded-lg px-2 py-1">
      <Skeleton className="h-3 w-3" />
      <Skeleton className="h-3 w-12" />
    </div>
  );
}
