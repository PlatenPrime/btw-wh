import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function GridCardSkeleton() {
  return (
    <Card className="bg-background shadow-muted-foreground group h-full w-full p-0 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ease-out hover:z-10 hover:shadow-2xl md:hover:-translate-y-1 md:hover:scale-105 dark:ring-gray-700">
      <CardHeader className="p-4 ">
        <div className="flex items-start justify-between">
          <Skeleton className="h-6 w-1/2" />
          <div className="flex items-start justify-between gap-4">
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="size-6 rounded-full" />
            <Skeleton className="size-6 rounded-full" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
