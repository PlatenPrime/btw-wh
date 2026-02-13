import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function PalletInRowCardSkeleton() {
  return (
    <Card className={cn("gap-2 p-2")}>
      <CardHeader className="flex items-start p-0">
        <div
          className={cn(
            "flex w-full items-center justify-start gap-2 rounded-md",
          )}
        >
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-14 shrink-0 rounded-md" />
        </div>
        <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
      </CardHeader>
      <CardContent className="grid gap-2 p-0">
        <div className="flex items-center justify-start gap-2">
          <Skeleton className="size-3.5 shrink-0" />
          <Skeleton className="h-3 w-16" />
        </div>
        <div className="flex items-center justify-start gap-2">
          <Skeleton className="size-3.5 shrink-0" />
          <Skeleton className="h-3 w-8" />
        </div>
      </CardContent>
    </Card>
  );
}
