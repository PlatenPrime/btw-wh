import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function UserCardSkeleton() {
  return (
    <Card className="gap-0 p-2">
      <CardHeader className="flex flex-row items-center justify-between gap-2 p-0">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Skeleton className="size-10 shrink-0 rounded-full" />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-14" />
            </div>
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="size-9 shrink-0 rounded-md" />
      </CardHeader>
      <CardContent className="grid gap-1 p-0 pt-2" />
    </Card>
  );
}
