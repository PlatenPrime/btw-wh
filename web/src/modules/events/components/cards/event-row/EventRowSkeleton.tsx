import { ListRowCard } from "@/components/shared/cards";
import { CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function EventRowSkeleton() {
  return (
    <ListRowCard>
      <CardContent className="grid gap-2 p-0">
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>

        <div className="grid gap-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>

        <Skeleton className="h-3 w-24" />
      </CardContent>
    </ListRowCard>
  );
}
