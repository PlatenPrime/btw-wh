import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ZonesGridCardSkeleton() {
  return (
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 p-0">
        <div className="flex items-center gap-2">
          <Skeleton className="size-3.5 shrink-0" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="size-3.5 shrink-0" />
          <Skeleton className="h-4 w-10" />
        </div>
      </CardContent>
    </Card>
  );
}
