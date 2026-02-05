import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RowsGridCardSkeleton() {
  return (
    <Card className="group/row h-full w-full p-0">
      <CardHeader className="flex items-center justify-between p-0">
        <div className="flex-1 rounded-lg p-2">
          <Skeleton className="mx-auto h-6 w-24" />
        </div>
        <Skeleton className="h-6 w-6 shrink-0" />
      </CardHeader>
    </Card>
  );
}
