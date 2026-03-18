import { Skeleton } from "@/components/ui/skeleton";

export function VariantContainerSkeleton() {
  return (
    <div className="grid gap-3">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}

