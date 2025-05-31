import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardDescription } from "@/components/ui/card";

export function GridItemSkeleton() {
  return (
    <Card className="w-full flex flex-row gap-2 px-2 py-2 items-center">
      <Skeleton className="w-16 h-16 rounded-md" />
      <CardDescription className="flex-1">
        <Skeleton className="h-4 w-3/4" />
      </CardDescription>
    </Card>
  );
}
