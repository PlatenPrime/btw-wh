import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DelArtikulsListSkeleton } from "@/modules/dels/components/lists/del-artikuls-list";

export function DelContainerSkeleton() {
  return (
    <div className="grid gap-4 p-4">
      <Card>
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="aspect-square size-16 shrink-0 rounded-lg" />
            <Skeleton className="h-7 w-48" />
          </div>
        </CardHeader>
        <CardContent>
          <DelArtikulsListSkeleton />
        </CardContent>
      </Card>
    </div>
  );
}
