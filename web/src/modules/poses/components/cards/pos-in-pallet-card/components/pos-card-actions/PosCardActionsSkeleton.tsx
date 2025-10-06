import { Skeleton } from "@/components/ui/skeleton";

export function PosCardActionsSkeleton() {
  return (
    <div className="grid gap-1">
      <Skeleton className="h-6 w-6" />
      <Skeleton className="h-6 w-6" />
    </div>
  );
}
