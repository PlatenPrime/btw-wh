import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SegmentCardSkeleton() {
  return (
    <Card className="gap-0 p-2">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex flex-row items-center justify-start gap-2">
            <div className="flex flex-row items-center justify-start gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="grid gap-1">
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
          </CardTitle>
          <Skeleton className="h-8 w-8" />
        </div>
      </CardHeader>
    </Card>
  );
}

