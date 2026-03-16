import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function RowsGridCardSkeleton() {
  return (
    <Card className="group/row h-full w-full border-border/60 bg-card/70 shadow-sm transition-all duration-200">
      <CardHeader className="flex items-center justify-between gap-3 px-3 py-2">
        <div className="flex-1">
          <Skeleton className="h-5 w-32 max-w-full" />
        </div>
        <Skeleton className="h-7 w-7 shrink-0 rounded-md" />
      </CardHeader>
    </Card>
  );
}
