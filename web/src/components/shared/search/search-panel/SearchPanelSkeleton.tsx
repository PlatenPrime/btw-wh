import { Skeleton } from "@/components/ui/skeleton";

export function SearchPanelSkeleton() {
  return (
    <div className="relative flex w-full items-center gap-2">
      <Skeleton className="absolute top-1/2 left-2 size-4 -translate-y-1/2" />
      <Skeleton className="h-10 w-full pl-8" />
    </div>
  );
}
