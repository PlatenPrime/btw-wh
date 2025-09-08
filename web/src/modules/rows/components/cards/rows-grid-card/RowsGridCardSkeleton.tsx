import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RowsGridCardSkeleton() {
  return (
    <Card className="bg-background shadow-muted-foreground group h-full w-full p-0 shadow-none ring-1 ring-gray-200 dark:ring-gray-700">
      <CardHeader className="flex h-full items-center justify-between p-0 pr-2">
        <Skeleton className="h-full w-full" />
        <div className="flex items-center gap-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="size-6 rounded-full" />
        </div>
      </CardHeader>
    </Card>
  );
}
