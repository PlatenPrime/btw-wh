import { Skeleton } from "@/components/ui/skeleton";

function SkladPosesListSkeleton({ rows }: { rows: number }) {
  return (
    <div className="grid gap-2">
      <div className="grid grid-cols-3">
        <Skeleton className="h-5 w-16 pl-4" />
        <div className="flex items-center justify-center">
          <Skeleton className="h-5 w-8" />
        </div>
        <div className="flex items-center justify-end pr-2">
          <Skeleton className="h-5 w-8" />
        </div>
      </div>
      <div className="grid gap-4">
        {Array.from({ length: rows }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-full rounded-md" />
        ))}
      </div>
    </div>
  );
}

export function PosesByArtikulContainerSkeleton() {
  return (
    <div className="grid items-start gap-2 lg:grid-cols-2">
      <SkladPosesListSkeleton rows={3} />
      <SkladPosesListSkeleton rows={2} />
    </div>
  );
}
