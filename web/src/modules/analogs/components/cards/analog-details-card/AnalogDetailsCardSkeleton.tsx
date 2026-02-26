import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AnalogDetailsCardSkeleton() {
  return (
    <Card className="p-2">
      <CardHeader className="gap-2 p-0 pb-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-24" />
      </CardHeader>
      <Skeleton className="mb-2 h-px w-full" />
      <CardContent className="grid gap-4 p-0">
        <div className="flex gap-3">
          <Skeleton className="aspect-square w-24 shrink-0 rounded-lg" />
          <div className="flex flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
        <Skeleton className="h-3 w-full" />
      </CardContent>
    </Card>
  );
}
