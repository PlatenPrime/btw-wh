import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PalletCardSkeleton() {
  return (
    <Card className="p-2 gap-0">
      <CardHeader className="flex flex-row items-center justify-between gap-2 p-0">
        <Skeleton className="h-4 max-w-[10rem] min-w-0 flex-1" />
        <Skeleton className="h-6 w-6 shrink-0 rounded-md" />
      </CardHeader>
      <CardContent className="p-0 pt-2">
        <div className="flex items-center gap-2">
          <Skeleton className="size-4 shrink-0" />
          <Skeleton className="h-3 w-10" />
        </div>
      </CardContent>
    </Card>
  );
}
