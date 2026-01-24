import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ArtGridCardSkeleton() {
  return (
    <Card className="shadow-muted-foreground h-full w-full p-0 shadow-none ring-1 ring-gray-200 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:z-10 hover:shadow-lg dark:ring-gray-700">
      <div className="h-full rounded-xl p-1">
        <div className="flex min-h-0 flex-1 items-start gap-3">
          <Skeleton className="h-12 w-12 flex-shrink-0 rounded-lg" />
          <div className="flex h-full w-full flex-col justify-between gap-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      </div>
    </Card>
  );
}
