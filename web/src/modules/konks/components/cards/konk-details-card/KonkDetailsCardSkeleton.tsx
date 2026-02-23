import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function KonkDetailsCardSkeleton() {
  return (
    <Card className="p-2">
      <CardContent className="flex items-start gap-2 p-0">
        <Skeleton className="aspect-square w-16 shrink-0 rounded-lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-40" />
        </div>
      </CardContent>
    </Card>
  );
}
