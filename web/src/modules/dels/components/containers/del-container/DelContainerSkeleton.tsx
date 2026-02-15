import { Skeleton } from "@/components/ui/skeleton";

export function DelContainerSkeleton() {
  return (
    <div className="grid gap-4 p-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
