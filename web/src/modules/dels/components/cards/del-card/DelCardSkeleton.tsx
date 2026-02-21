import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function DelCardSkeleton() {
  return (
    <Card className="gap-0 p-2 transition-shadow hover:shadow-md">
      <CardContent className="flex items-center gap-2 p-0">
        <Skeleton className="size-12 shrink-0 rounded" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-24" />
        </div>
      </CardContent>
    </Card>
  );
}
