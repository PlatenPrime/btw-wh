import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function GridCardSkeleton() {
  return (
    <Card className="bg-background shadow-muted-foreground h-full p-0 shadow-none ring-1 ring-gray-200 dark:ring-gray-700">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-8 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
          <div className="flex flex-wrap gap-1">
            <Skeleton className="h-6 w-12 rounded-md" />
            <Skeleton className="h-6 w-16 rounded-md" />
            <Skeleton className="h-6 w-14 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
