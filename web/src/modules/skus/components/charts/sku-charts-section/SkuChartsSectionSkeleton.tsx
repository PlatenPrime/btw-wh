import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkuChartsSectionSkeleton() {
  return (
    <div className="grid gap-3">
      <div className="grid gap-2 rounded-lg border p-2 sm:grid-cols-3">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full sm:justify-self-end sm:w-24" />
      </div>
      <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
        <Card className="overflow-hidden shadow-md">
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-52" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
        <Card className="overflow-hidden shadow-md">
          <CardHeader className="pb-2">
            <Skeleton className="h-5 w-36" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-64 w-full" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
