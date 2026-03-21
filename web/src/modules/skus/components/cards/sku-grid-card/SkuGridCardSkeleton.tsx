import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function SkuGridCardSkeleton() {
  return (
    <Card className="gap-0 p-2 transition-shadow">
      <CardHeader className="p-0">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-4 w-24" />
        </div>
      </CardHeader>
      <CardContent className="grid gap-2 p-0 pt-2">
        <div className="flex items-start gap-3">
          <Skeleton className="aspect-square w-full max-w-[6rem] shrink-0 rounded-lg" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <Skeleton className="h-4 w-full max-w-[12rem]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
