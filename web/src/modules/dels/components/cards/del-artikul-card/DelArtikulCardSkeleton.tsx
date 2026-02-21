import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DelArtikulCardSkeleton() {
  return (
    <Card
      className="flex flex-row items-center gap-2 p-2 shadow-none ring-1 ring-gray-200 dark:ring-gray-700"
    >
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Skeleton className="size-12 shrink-0 rounded" />
        <Skeleton className="h-5 min-w-0 flex-1 max-w-32" />
        <Skeleton className="h-4 w-8 shrink-0" />
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <Skeleton className="h-8 w-24" />
      </div>
    </Card>
  );
}
